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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Package, Upload, FileText, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [ktpDialogOpen, setKtpDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [ktpFile, setKtpFile] = useState(null);
  const [buktiFile, setBuktiFile] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchBookings();
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${API}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Gagal memuat data booking');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadKTP = async () => {
    if (!ktpFile) {
      toast.error('Pilih file KTP');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await axios.put(
          `${API}/auth/ktp`,
          { ktp_base64: reader.result },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('KTP berhasil diupload');
        setKtpDialogOpen(false);
      } catch (error) {
        toast.error('Upload KTP gagal');
      }
    };
    reader.readAsDataURL(ktpFile);
  };

  const handleUploadBukti = async () => {
    if (!buktiFile || !selectedBooking) {
      toast.error('Pilih file bukti transfer');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        await axios.post(
          `${API}/bookings/${selectedBooking.id}/payment`,
          { bukti_transfer_base64: reader.result },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success('Bukti transfer berhasil diupload');
        setUploadDialogOpen(false);
        fetchBookings();
      } catch (error) {
        toast.error('Upload bukti transfer gagal');
      }
    };
    reader.readAsDataURL(buktiFile);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700' },
      approved: { label: 'Disetujui', color: 'bg-blue-100 text-blue-700' },
      active: { label: 'Aktif', color: 'bg-green-100 text-green-700' },
      completed: { label: 'Selesai', color: 'bg-gray-100 text-gray-700' },
      rejected: { label: 'Ditolak', color: 'bg-red-100 text-red-700' }
    };
    const { label, color } = statusMap[status] || statusMap.pending;
    return <Badge className={color}>{label}</Badge>;
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
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }} data-testid="dashboard-title">
            Dashboard Saya
          </h1>
          <p className="text-gray-600">Kelola booking dan informasi akun Anda</p>
        </div>

        {/* User Info Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                  {user?.nama}
                </h2>
                <p className="text-gray-600 mb-1">{user?.email}</p>
                <p className="text-gray-600">{user?.phone}</p>
              </div>
              <div>
                <Button
                  variant="outline"
                  onClick={() => setKtpDialogOpen(true)}
                  data-testid="upload-ktp-button"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {user?.ktp_url ? 'Update KTP' : 'Upload KTP'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all" data-testid="all-bookings-tab">Semua Booking</TabsTrigger>
            <TabsTrigger value="pending" data-testid="pending-bookings-tab">Menunggu</TabsTrigger>
            <TabsTrigger value="active" data-testid="active-bookings-tab">Aktif</TabsTrigger>
            <TabsTrigger value="completed" data-testid="completed-bookings-tab">Selesai</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6" data-testid="all-bookings-content">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Belum ada booking</p>
                  <Button onClick={() => navigate('/katalog')} data-testid="browse-products-button">
                    Jelajahi Produk
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <Card key={booking.id} data-testid={`booking-card-${booking.id}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                              Booking #{booking.id.slice(0, 8)}
                            </h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {format(new Date(booking.tanggal_mulai), 'dd MMM yyyy', { locale: id })} - 
                            {format(new Date(booking.tanggal_selesai), 'dd MMM yyyy', { locale: id })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            Rp {booking.total_harga?.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 mb-4">
                        {booking.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            {item.product_image && (
                              <img 
                                src={item.product_image} 
                                alt={item.product_nama}
                                className="w-16 h-16 object-cover rounded"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.product_nama || `Product ${item.product_id}`}</p>
                              <p className="text-sm text-gray-600">Jumlah: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {booking.status === 'pending' && !booking.bukti_transfer && (
                        <Button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setUploadDialogOpen(true);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                          data-testid="upload-payment-proof-button"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Bukti Transfer
                        </Button>
                      )}

                      {booking.bukti_transfer && (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Bukti transfer sudah diupload
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {['pending', 'active', 'completed'].map(status => (
            <TabsContent key={status} value={status} className="mt-6">
              <div className="space-y-4">
                {bookings.filter(b => b.status === status).length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-gray-500">Tidak ada booking dengan status ini</p>
                    </CardContent>
                  </Card>
                ) : (
                  bookings.filter(b => b.status === status).map(booking => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                                Booking #{booking.id.slice(0, 8)}
                              </h3>
                              {getStatusBadge(booking.status)}
                            </div>
                            <p className="text-sm text-gray-600">
                              {format(new Date(booking.tanggal_mulai), 'dd MMM yyyy', { locale: id })} - 
                              {format(new Date(booking.tanggal_selesai), 'dd MMM yyyy', { locale: id })}
                            </p>
                          </div>
                          <p className="text-2xl font-bold text-green-600">
                            Rp {booking.total_harga?.toLocaleString('id-ID')}
                          </p>
                        </div>

                        <div className="space-y-2">
                          {booking.items?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <p className="font-medium">{item.product_nama || `Product ${item.product_id}`}</p>
                              <p className="text-sm text-gray-600">x{item.quantity}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Upload KTP Dialog */}
      <Dialog open={ktpDialogOpen} onOpenChange={setKtpDialogOpen}>
        <DialogContent data-testid="ktp-upload-dialog">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Space Grotesk' }}>Upload KTP</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="ktp-file">Pilih File KTP (JPG/PNG)</Label>
              <input
                id="ktp-file"
                type="file"
                accept="image/*"
                onChange={(e) => setKtpFile(e.target.files[0])}
                className="mt-2"
                data-testid="ktp-file-input"
              />
            </div>
            <Button 
              onClick={handleUploadKTP} 
              className="w-full bg-green-600 hover:bg-green-700"
              data-testid="confirm-ktp-upload-button"
            >
              Upload KTP
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Bukti Transfer Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent data-testid="payment-proof-dialog">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: 'Space Grotesk' }}>Upload Bukti Transfer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bukti-file">Pilih File Bukti Transfer (JPG/PNG)</Label>
              <input
                id="bukti-file"
                type="file"
                accept="image/*"
                onChange={(e) => setBuktiFile(e.target.files[0])}
                className="mt-2"
                data-testid="bukti-file-input"
              />
            </div>
            <Button 
              onClick={handleUploadBukti} 
              className="w-full bg-green-600 hover:bg-green-700"
              data-testid="confirm-bukti-upload-button"
            >
              Upload Bukti
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default UserDashboard;
