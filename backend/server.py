from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
import jwt
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

security = HTTPBearer()

# Create the main app
app = FastAPI()
api_router = APIRouter(prefix="/api")

# ============= MODELS =============

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    nama: str
    phone: str
    role: str = "user"  # user or admin
    ktp_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    nama: str
    phone: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nama: str
    kategori: str
    deskripsi: str
    harga_per_hari: float
    stok: int
    images: List[str] = []
    brand: Optional[str] = None
    kapasitas: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    nama: str
    kategori: str
    deskripsi: str
    harga_per_hari: float
    stok: int
    images: List[str] = []
    brand: Optional[str] = None
    kapasitas: Optional[str] = None

class BookingItem(BaseModel):
    product_id: str
    quantity: int

class Booking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    user_email: str
    user_nama: str
    items: List[BookingItem]
    tanggal_mulai: str
    tanggal_selesai: str
    total_harga: float
    status: str = "pending"  # pending, approved, active, completed, rejected
    bukti_transfer: Optional[str] = None
    ktp_url: Optional[str] = None
    catatan: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BookingCreate(BaseModel):
    items: List[BookingItem]
    tanggal_mulai: str
    tanggal_selesai: str
    catatan: Optional[str] = None

class PaymentUpload(BaseModel):
    bukti_transfer_base64: str

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    judul: str
    konten: str
    kategori: str
    excerpt: str
    gambar: str
    author: str = "Admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostCreate(BaseModel):
    judul: str
    konten: str
    kategori: str
    excerpt: str
    gambar: str

class Settings(BaseModel):
    model_config = ConfigDict(extra="ignore")
    whatsapp_number: str = "6281234567890"
    email_contact: str = "info@outdoorrental.com"
    alamat: str = "Jl. Petualangan No. 123, Jakarta"
    jam_operasional: str = "Senin-Minggu: 08.00-20.00 WIB"
    biaya_denda_per_hari: float = 50000.0

# ============= AUTH HELPERS =============

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return User(**user)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# ============= AUTH ROUTES =============

@api_router.post("/auth/register")
async def register(user_data: UserCreate):
    # Check if user exists
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email sudah terdaftar")
    
    # Create user
    user = User(
        email=user_data.email,
        nama=user_data.nama,
        phone=user_data.phone,
        role="user"
    )
    
    doc = user.model_dump()
    doc['password_hash'] = get_password_hash(user_data.password)
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.users.insert_one(doc)
    
    # Create token
    token = create_access_token({"sub": user.id, "email": user.email})
    
    return {
        "token": token,
        "user": user.model_dump()
    }

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    # Find user
    user_doc = await db.users.find_one({"email": credentials.email})
    if not user_doc:
        raise HTTPException(status_code=401, detail="Email atau password salah")
    
    # Verify password
    if not verify_password(credentials.password, user_doc['password_hash']):
        raise HTTPException(status_code=401, detail="Email atau password salah")
    
    user = User(**user_doc)
    token = create_access_token({"sub": user.id, "email": user.email})
    
    return {
        "token": token,
        "user": user.model_dump()
    }

@api_router.get("/auth/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@api_router.put("/auth/ktp")
async def upload_ktp(ktp_data: dict, current_user: User = Depends(get_current_user)):
    ktp_base64 = ktp_data.get('ktp_base64')
    if not ktp_base64:
        raise HTTPException(status_code=400, detail="KTP data required")
    
    await db.users.update_one(
        {"id": current_user.id},
        {"$set": {"ktp_url": ktp_base64}}
    )
    
    return {"message": "KTP berhasil diupload"}

# ============= PRODUCT ROUTES =============

@api_router.get("/products")
async def get_products(
    kategori: Optional[str] = None,
    search: Optional[str] = None,
    min_harga: Optional[float] = None,
    max_harga: Optional[float] = None
):
    query = {}
    
    if kategori:
        query['kategori'] = kategori
    
    if search:
        query['$or'] = [
            {"nama": {"$regex": search, "$options": "i"}},
            {"deskripsi": {"$regex": search, "$options": "i"}}
        ]
    
    if min_harga is not None:
        query['harga_per_hari'] = query.get('harga_per_hari', {})
        query['harga_per_hari']['$gte'] = min_harga
    
    if max_harga is not None:
        query['harga_per_hari'] = query.get('harga_per_hari', {})
        query['harga_per_hari']['$lte'] = max_harga
    
    products = await db.products.find(query, {"_id": 0}).to_list(1000)
    return products

@api_router.get("/products/{product_id}")
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Produk tidak ditemukan")
    return product

@api_router.post("/products")
async def create_product(
    product_data: ProductCreate,
    current_user: User = Depends(get_current_admin)
):
    product = Product(**product_data.model_dump())
    doc = product.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.products.insert_one(doc)
    return product

@api_router.put("/products/{product_id}")
async def update_product(
    product_id: str,
    product_data: ProductCreate,
    current_user: User = Depends(get_current_admin)
):
    result = await db.products.update_one(
        {"id": product_id},
        {"$set": product_data.model_dump()}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Produk tidak ditemukan")
    
    return {"message": "Produk berhasil diupdate"}

@api_router.delete("/products/{product_id}")
async def delete_product(
    product_id: str,
    current_user: User = Depends(get_current_admin)
):
    result = await db.products.delete_one({"id": product_id})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Produk tidak ditemukan")
    
    return {"message": "Produk berhasil dihapus"}

# ============= BOOKING ROUTES =============

@api_router.post("/bookings")
async def create_booking(
    booking_data: BookingCreate,
    current_user: User = Depends(get_current_user)
):
    # Calculate total price
    from datetime import datetime
    start = datetime.fromisoformat(booking_data.tanggal_mulai)
    end = datetime.fromisoformat(booking_data.tanggal_selesai)
    days = (end - start).days
    
    if days < 1:
        raise HTTPException(status_code=400, detail="Minimal sewa 1 hari")
    
    total = 0
    for item in booking_data.items:
        product = await db.products.find_one({"id": item.product_id})
        if not product:
            raise HTTPException(status_code=404, detail=f"Produk {item.product_id} tidak ditemukan")
        
        if product['stok'] < item.quantity:
            raise HTTPException(status_code=400, detail=f"Stok {product['nama']} tidak cukup")
        
        total += product['harga_per_hari'] * item.quantity * days
    
    # Create booking
    booking = Booking(
        user_id=current_user.id,
        user_email=current_user.email,
        user_nama=current_user.nama,
        items=booking_data.items,
        tanggal_mulai=booking_data.tanggal_mulai,
        tanggal_selesai=booking_data.tanggal_selesai,
        total_harga=total,
        catatan=booking_data.catatan,
        ktp_url=current_user.ktp_url
    )
    
    doc = booking.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.bookings.insert_one(doc)
    
    return booking

@api_router.get("/bookings")
async def get_user_bookings(current_user: User = Depends(get_current_user)):
    bookings = await db.bookings.find(
        {"user_id": current_user.id},
        {"_id": 0}
    ).sort("created_at", -1).to_list(1000)
    
    # Enrich with product details
    for booking in bookings:
        for item in booking['items']:
            product = await db.products.find_one({"id": item['product_id']}, {"_id": 0})
            if product:
                item['product_nama'] = product['nama']
                item['product_image'] = product['images'][0] if product['images'] else None
    
    return bookings

@api_router.get("/bookings/all")
async def get_all_bookings(current_user: User = Depends(get_current_admin)):
    bookings = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for booking in bookings:
        for item in booking['items']:
            product = await db.products.find_one({"id": item['product_id']}, {"_id": 0})
            if product:
                item['product_nama'] = product['nama']
                item['product_image'] = product['images'][0] if product['images'] else None
    
    return bookings

@api_router.put("/bookings/{booking_id}/status")
async def update_booking_status(
    booking_id: str,
    status_data: dict,
    current_user: User = Depends(get_current_admin)
):
    new_status = status_data.get('status')
    if new_status not in ['pending', 'approved', 'active', 'completed', 'rejected']:
        raise HTTPException(status_code=400, detail="Status tidak valid")
    
    result = await db.bookings.update_one(
        {"id": booking_id},
        {"$set": {"status": new_status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking tidak ditemukan")
    
    return {"message": "Status booking berhasil diupdate"}

@api_router.post("/bookings/{booking_id}/payment")
async def upload_payment(
    booking_id: str,
    payment_data: PaymentUpload,
    current_user: User = Depends(get_current_user)
):
    booking = await db.bookings.find_one({"id": booking_id, "user_id": current_user.id})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking tidak ditemukan")
    
    result = await db.bookings.update_one(
        {"id": booking_id},
        {"$set": {"bukti_transfer": payment_data.bukti_transfer_base64}}
    )
    
    return {"message": "Bukti transfer berhasil diupload"}

# ============= BLOG ROUTES =============

@api_router.get("/blog")
async def get_blog_posts(kategori: Optional[str] = None):
    query = {}
    if kategori:
        query['kategori'] = kategori
    
    posts = await db.blog_posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return posts

@api_router.get("/blog/{post_id}")
async def get_blog_post(post_id: str):
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Artikel tidak ditemukan")
    return post

@api_router.post("/blog")
async def create_blog_post(
    post_data: BlogPostCreate,
    current_user: User = Depends(get_current_admin)
):
    post = BlogPost(**post_data.model_dump())
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.blog_posts.insert_one(doc)
    return post

# ============= SETTINGS ROUTES =============

@api_router.get("/settings")
async def get_settings():
    settings = await db.settings.find_one({}, {"_id": 0})
    if not settings:
        # Return default settings
        default_settings = Settings()
        return default_settings.model_dump()
    return settings

@api_router.put("/settings")
async def update_settings(
    settings_data: Settings,
    current_user: User = Depends(get_current_admin)
):
    await db.settings.delete_many({})
    await db.settings.insert_one(settings_data.model_dump())
    return {"message": "Pengaturan berhasil diupdate"}

# ============= STATS ROUTES =============

@api_router.get("/stats")
async def get_stats(current_user: User = Depends(get_current_admin)):
    total_users = await db.users.count_documents({"role": "user"})
    total_bookings = await db.bookings.count_documents({})
    total_products = await db.products.count_documents({})
    
    # Calculate total revenue
    bookings = await db.bookings.find(
        {"status": {"$in": ["approved", "active", "completed"]}},
        {"_id": 0}
    ).to_list(10000)
    
    total_revenue = sum(b.get('total_harga', 0) for b in bookings)
    
    # Get recent bookings
    recent_bookings = await db.bookings.find(
        {},
        {"_id": 0}
    ).sort("created_at", -1).limit(5).to_list(5)
    
    return {
        "total_users": total_users,
        "total_bookings": total_bookings,
        "total_products": total_products,
        "total_revenue": total_revenue,
        "recent_bookings": recent_bookings
    }

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()