import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { UserPlus, Search, Calendar, CreditCard, Package, CheckCircle } from 'lucide-react';

const CaraSewa = () => {
  const navigate = useNavigate();

  const steps = [
    {
      icon: UserPlus,
      title: 'Daftar/Login',
      desc: 'Buat akun atau login jika sudah memiliki akun',
      detail: 'Registrasi sangat mudah, hanya perlu email dan nomor telepon. Pastikan data yang dimasukkan valid untuk keperluan verifikasi.'
    },
    {
      icon: Search,
      title: 'Pilih Produk',
      desc: 'Jelajahi katalog dan pilih peralatan yang dibutuhkan',
      detail: 'Gunakan filter kategori dan harga untuk mempermudah pencarian. Lihat detail produk untuk spesifikasi lengkap.'
    },
    {
      icon: Calendar,
      title: 'Tentukan Tanggal',
      desc: 'Pilih tanggal mulai dan selesai penyewaan',
      detail: 'Pastikan memilih tanggal yang tepat. Sistem akan otomatis menghitung total biaya berdasarkan durasi sewa.'
    },
    {
      icon: CreditCard,
      title: 'Upload Bukti Transfer',
      desc: 'Lakukan pembayaran dan upload bukti transfer',
      detail: 'Transfer ke rekening yang tertera, lalu upload bukti transfer untuk verifikasi pembayaran.'
    },
    {
      icon: Package,
      title: 'Ambil Barang',
      desc: 'Ambil barang di lokasi kami sesuai jadwal',
      detail: 'Setelah pembayaran diverifikasi, Anda bisa mengambil barang di alamat kami. Jangan lupa bawa KTP asli.'
    },
    {
      icon: CheckCircle,
      title: 'Kembalikan Tepat Waktu',
      desc: 'Kembalikan barang dalam kondisi baik dan tepat waktu',
      detail: 'Keterlambatan pengembalian akan dikenakan denda. Pastikan barang dikembalikan dalam kondisi bersih.'
    }
  ];

  const syarat = [
    'Memiliki KTP/SIM yang masih berlaku',
    'Upload foto KTP untuk verifikasi',
    'Melakukan pembayaran minimal DP 50%',
    'Mengisi formulir booking dengan lengkap',
    'Menjaga kondisi barang selama penyewaan'
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }} data-testid="cara-sewa-title">
            Cara Sewa Peralatan
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            Proses sewa yang mudah dan cepat dalam 6 langkah sederhana
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8" data-testid="steps-list">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="card-hover" data-testid={`step-card-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="h-6 w-6 text-green-600" />
                          <h3 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk' }} data-testid="step-title">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-lg text-gray-700 mb-2" data-testid="step-desc">{step.desc}</p>
                        <p className="text-gray-600" data-testid="step-detail">{step.detail}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Syarat & Ketentuan */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="border-b">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>Syarat & Ketentuan</h2>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3" data-testid="syarat-list">
                  {syarat.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="border-b">
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'Space Grotesk' }}>Informasi Pembayaran</h2>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Metode Pembayaran:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Transfer Bank (BCA, Mandiri, BNI)</li>
                      <li>• E-Wallet (DANA, OVO, GoPay)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Ketentuan Denda:</h3>
                    <p className="text-gray-600">
                      Keterlambatan pengembalian dikenakan denda Rp 50.000/hari. 
                      Kerusakan barang akan dikenakan biaya sesuai harga barang.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Siap Untuk Mulai Menyewa?
          </h2>
          <p className="text-gray-600 mb-8">
            Jelajahi katalog lengkap kami dan pilih peralatan camping impianmu!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/katalog')}
              data-testid="explore-catalog-button"
            >
              Jelajahi Katalog
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/kontak')}
              data-testid="contact-button"
            >
              Hubungi Kami
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const CardHeader = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export default CaraSewa;
