import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Package, Calendar as CalendarIcon, ShoppingCart, Check } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProductDetail = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [catatan, setCatatan] = useState('');
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API}/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Produk tidak ditemukan');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!dateStart || !dateEnd || !product) return 0;
    const days = Math.ceil((dateEnd - dateStart) / (1000 * 60 * 60 * 24));
    return days * product.harga_per_hari * quantity;
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    if (!dateStart || !dateEnd) {
      toast.error('Pilih tanggal sewa');
      return;
    }

    if (quantity > product.stok) {
      toast.error('Stok tidak mencukupi');
      return;
    }

    setSubmitting(true);
    try {
      const bookingData = {
        items: [{
          product_id: product.id,
          quantity: quantity
        }],
        tanggal_mulai: dateStart.toISOString(),
        tanggal_selesai: dateEnd.toISOString(),
        catatan: catatan
      };

      await axios.post(`${API}/bookings`, bookingData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Booking berhasil dibuat!');
      setBookingDialogOpen(false);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Booking gagal');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Produk tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100 mb-4">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.nama}
                  className="w-full h-full object-cover"
                  data-testid="product-detail-image"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-24 w-24 text-gray-300" />
                </div>
              )}
            </div>
            
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((img, idx) => (
                  <div key={idx} className="h-24 rounded-lg overflow-hidden bg-gray-100">
                    <img src={img} alt={`${product.nama} ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <Badge className="mb-3 bg-green-100 text-green-700" data-testid="product-category-badge">
              {product.kategori}
            </Badge>
            
            <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }} data-testid="product-detail-name">
              {product.nama}
            </h1>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-green-600" data-testid="product-detail-price">
                Rp {product.harga_per_hari?.toLocaleString('id-ID')}
              </span>
              <span className="text-gray-500">/hari</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">Stok Tersedia</p>
                  <p className="text-2xl font-bold" data-testid="product-detail-stock">{product.stok}</p>
                </CardContent>
              </Card>
              
              {product.kapasitas && (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600">Kapasitas</p>
                    <p className="text-2xl font-bold" data-testid="product-detail-capacity">{product.kapasitas}</p>
                  </CardContent>
                </Card>
              )}
              
              {product.brand && (
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-gray-600">Brand</p>
                    <p className="text-xl font-semibold" data-testid="product-detail-brand">{product.brand}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Deskripsi</h3>
              <p className="text-gray-700 leading-relaxed" data-testid="product-detail-description">{product.deskripsi}</p>
            </div>

            <div className="flex gap-3">
              <Dialog open={bookingDialogOpen} onOpenChange={setBookingDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={product.stok === 0}
                    data-testid="book-now-button"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {product.stok === 0 ? 'Stok Habis' : 'Booking Sekarang'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md" data-testid="booking-dialog">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: 'Space Grotesk' }}>Booking {product.nama}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>Jumlah</Label>
                      <Input
                        type="number"
                        min="1"
                        max={product.stok}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        data-testid="quantity-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Tanggal Mulai</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left" data-testid="start-date-trigger">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateStart ? format(dateStart, 'dd MMM yyyy', { locale: id }) : 'Pilih tanggal'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateStart}
                              onSelect={setDateStart}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label>Tanggal Selesai</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left" data-testid="end-date-trigger">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {dateEnd ? format(dateEnd, 'dd MMM yyyy', { locale: id }) : 'Pilih tanggal'}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dateEnd}
                              onSelect={setDateEnd}
                              disabled={(date) => date < (dateStart || new Date())}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div>
                      <Label>Catatan (Opsional)</Label>
                      <Textarea
                        placeholder="Tambahkan catatan untuk pesanan Anda..."
                        value={catatan}
                        onChange={(e) => setCatatan(e.target.value)}
                        data-testid="notes-textarea"
                      />
                    </div>

                    {dateStart && dateEnd && (
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2">
                            <span>Durasi:</span>
                            <span className="font-semibold">
                              {Math.ceil((dateEnd - dateStart) / (1000 * 60 * 60 * 24))} hari
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span className="text-green-600" data-testid="booking-total-price">
                              Rp {calculateTotal().toLocaleString('id-ID')}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700" 
                      onClick={handleBooking}
                      disabled={submitting || !dateStart || !dateEnd}
                      data-testid="confirm-booking-button"
                    >
                      {submitting ? 'Memproses...' : 'Konfirmasi Booking'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk' }}>Kenapa Sewa di Kami?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Kualitas Terjamin', desc: 'Semua produk dalam kondisi prima dan terawat' },
              { title: 'Harga Kompetitif', desc: 'Harga sewa terbaik dengan kualitas premium' },
              { title: 'Proses Mudah', desc: 'Booking online mudah dan cepat' }
            ].map((feature, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
