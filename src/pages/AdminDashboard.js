import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { Users, Package, ShoppingBag, DollarSign, Plus } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, token, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nama: '',
    kategori: 'Tenda',
    deskripsi: '',
    harga_per_hari: 0,
    stok: 0,
    images: [],
    brand: '',
    kapasitas: ''
  });

  useEffect(() => {
    if (!isAdmin) {
      toast.error('Akses ditolak');
      navigate('/dashboard');
      return;
    }
    fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [statsRes, bookingsRes, productsRes] = await Promise.all([
        axios.get(`${API}/stats`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API}/bookings/all`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API}/products`)
      ]);
      setStats(statsRes.data);
      setBookings(bookingsRes.data);
      setProducts(productsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      // Convert images string to array
      const imageArray = newProduct.images[0] ? newProduct.images[0].split(',').map(url => url.trim()) : [];
      
      await axios.post(`${API}/products`, {
        ...newProduct,
        images: imageArray,
        harga_per_hari: parseFloat(newProduct.harga_per_hari),
        stok: parseInt(newProduct.stok)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Produk berhasil ditambahkan');
      setAddProductOpen(false);
      fetchData();
      
      // Reset form
      setNewProduct({
        nama: '',
        kategori: 'Tenda',
        deskripsi: '',
        harga_per_hari: 0,
        stok: 0,
        images: [],
        brand: '',
        kapasitas: ''
      });
    } catch (error) {
      toast.error('Gagal menambahkan produk');
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      await axios.put(
        `${API}/bookings/${bookingId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Status berhasil diupdate');
      fetchData();
    } catch (error) {
      toast.error('Gagal update status');
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }} data-testid="admin-dashboard-title">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Kelola produk, booking, dan statistik</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl font-bold" data-testid="total-users">{stats?.total_users || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Produk</p>
                  <p className="text-3xl font-bold" data-testid="total-products">{stats?.total_products || 0}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Booking</p>
                  <p className="text-3xl font-bold" data-testid="total-bookings">{stats?.total_bookings || 0}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold" data-testid="total-revenue">
                    Rp {(stats?.total_revenue || 0).toLocaleString('id-ID')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList>
            <TabsTrigger value="bookings" data-testid="bookings-tab">Booking Management</TabsTrigger>
            <TabsTrigger value="products" data-testid="products-tab">Product Management</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'Space Grotesk' }}>Semua Booking</h2>
            </div>

            <div className="space-y-4" data-testid="bookings-list">
              {bookings.map(booking => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                          {booking.user_nama}
                        </h3>
                        <p className="text-sm text-gray-600">{booking.user_email}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(booking.tanggal_mulai).toLocaleDateString('id-ID')} - 
                          {new Date(booking.tanggal_selesai).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600 mb-2">
                          Rp {booking.total_harga?.toLocaleString('id-ID')}
                        </p>
                        <Select
                          value={booking.status}
                          onValueChange={(value) => handleUpdateStatus(booking.id, value)}
                        >
                          <SelectTrigger className="w-40" data-testid={`status-select-${booking.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Menunggu</SelectItem>
                            <SelectItem value="approved">Disetujui</SelectItem>
                            <SelectItem value="active">Aktif</SelectItem>
                            <SelectItem value="completed">Selesai</SelectItem>
                            <SelectItem value="rejected">Ditolak</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {booking.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <p className="font-medium">{item.product_nama || item.product_id}</p>
                          <p className="text-sm text-gray-600">x{item.quantity}</p>
                        </div>
                      ))}
                    </div>

                    {booking.bukti_transfer && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-700">Bukti transfer telah diupload</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold" style={{ fontFamily: 'Space Grotesk' }}>Produk</h2>
              <Dialog open={addProductOpen} onOpenChange={setAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700" data-testid="add-product-button">
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Produk
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="add-product-dialog">
                  <DialogHeader>
                    <DialogTitle style={{ fontFamily: 'Space Grotesk' }}>Tambah Produk Baru</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="nama">Nama Produk</Label>
                      <Input
                        id="nama"
                        value={newProduct.nama}
                        onChange={(e) => setNewProduct({...newProduct, nama: e.target.value})}
                        data-testid="product-name-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="kategori">Kategori</Label>
                      <Select
                        value={newProduct.kategori}
                        onValueChange={(value) => setNewProduct({...newProduct, kategori: value})}
                      >
                        <SelectTrigger data-testid="product-category-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tenda">Tenda</SelectItem>
                          <SelectItem value="Carrier">Carrier</SelectItem>
                          <SelectItem value="Sleeping">Sleeping</SelectItem>
                          <SelectItem value="Masak">Masak</SelectItem>
                          <SelectItem value="Hiking">Hiking</SelectItem>
                          <SelectItem value="Lighting">Lighting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="deskripsi">Deskripsi</Label>
                      <Textarea
                        id="deskripsi"
                        value={newProduct.deskripsi}
                        onChange={(e) => setNewProduct({...newProduct, deskripsi: e.target.value})}
                        data-testid="product-description-input"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="harga">Harga per Hari</Label>
                        <Input
                          id="harga"
                          type="number"
                          value={newProduct.harga_per_hari}
                          onChange={(e) => setNewProduct({...newProduct, harga_per_hari: e.target.value})}
                          data-testid="product-price-input"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stok">Stok</Label>
                        <Input
                          id="stok"
                          type="number"
                          value={newProduct.stok}
                          onChange={(e) => setNewProduct({...newProduct, stok: e.target.value})}
                          data-testid="product-stock-input"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="brand">Brand</Label>
                      <Input
                        id="brand"
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                        data-testid="product-brand-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="kapasitas">Kapasitas (contoh: 2 Orang)</Label>
                      <Input
                        id="kapasitas"
                        value={newProduct.kapasitas}
                        onChange={(e) => setNewProduct({...newProduct, kapasitas: e.target.value})}
                        data-testid="product-capacity-input"
                      />
                    </div>

                    <div>
                      <Label htmlFor="images">URL Gambar (pisahkan dengan koma)</Label>
                      <Textarea
                        id="images"
                        placeholder="https://image1.jpg, https://image2.jpg"
                        value={newProduct.images[0] || ''}
                        onChange={(e) => setNewProduct({...newProduct, images: [e.target.value]})}
                        data-testid="product-images-input"
                      />
                    </div>

                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={handleAddProduct}
                      data-testid="submit-product-button"
                    >
                      Tambah Produk
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-3 gap-6" data-testid="products-grid">
              {products.map(product => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <Badge className="mb-2">{product.kategori}</Badge>
                    <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                      {product.nama}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.deskripsi}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-green-600">
                        Rp {product.harga_per_hari?.toLocaleString('id-ID')}
                      </p>
                      <p className="text-sm">Stok: {product.stok}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
