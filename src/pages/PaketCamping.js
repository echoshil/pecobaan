import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Check } from 'lucide-react';

const PaketCamping = () => {
  const navigate = useNavigate();

  const packages = [
    {
      nama: 'Paket Solo Adventure',
      kapasitas: '1 Orang',
      harga: 150000,
      items: [
        'Tenda 1 Orang',
        'Sleeping Bag',
        'Matras',
        'Carrier 40L',
        'Headlamp',
        'Kompor Portable'
      ],
      popular: false
    },
    {
      nama: 'Paket Duo Explorer',
      kapasitas: '2 Orang',
      harga: 250000,
      items: [
        'Tenda 2 Orang',
        '2x Sleeping Bag',
        '2x Matras',
        'Carrier 50L',
        'Headlamp',
        'Kompor + Nesting',
        'Flysheet'
      ],
      popular: true
    },
    {
      nama: 'Paket Family Camp',
      kapasitas: '4 Orang',
      harga: 450000,
      items: [
        'Tenda 4 Orang',
        '4x Sleeping Bag',
        '4x Matras',
        '2x Carrier 60L',
        '2x Headlamp',
        'Kompor + Nesting Lengkap',
        'Flysheet',
        'Tarp'
      ],
      popular: false
    },
    {
      nama: 'Paket Mountain Pro',
      kapasitas: '2-3 Orang',
      harga: 400000,
      items: [
        'Tenda Gunung 3 Season',
        '3x Sleeping Bag -5°C',
        '3x Matras Busa Tebal',
        '2x Carrier 70L',
        'Trekking Pole',
        '2x Headlamp',
        'Kompor Windproof',
        'Nesting Set',
        'Rain Cover'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }} data-testid="paket-camping-title">
            Paket Camping Lengkap
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            Pilih paket camping yang sesuai dengan kebutuhanmu. Hemat waktu dan biaya dengan paket bundling kami!
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-testid="packages-grid">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`card-hover relative ${
                  pkg.popular ? 'border-2 border-green-500 shadow-2xl' : ''
                }`}
                data-testid={`package-card-${index}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-green-600 text-white px-4 py-1" data-testid="popular-badge">
                      Paling Populer
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }} data-testid="package-name">
                      {pkg.nama}
                    </h3>
                    <p className="text-gray-600 mb-4" data-testid="package-capacity">{pkg.kapasitas}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-green-600" data-testid="package-price">
                        Rp {pkg.harga.toLocaleString('id-ID')}
                      </span>
                      <p className="text-sm text-gray-500">/hari</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {pkg.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${
                      pkg.popular 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    onClick={() => navigate('/katalog')}
                    data-testid="package-order-button"
                  >
                    Pesan Sekarang
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Info */}
          <Card className="mt-12 bg-green-50 border-green-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Butuh Paket Custom?
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Hubungi kami untuk membuat paket camping sesuai kebutuhanmu. 
                Tim kami siap membantu merencanakan petualanganmu!
              </p>
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/kontak')}
                data-testid="custom-package-button"
              >
                Hubungi Kami
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Kenapa Pilih Paket Kami?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Lebih Hemat',
                desc: 'Dapatkan diskon hingga 20% dibanding sewa satuan'
              },
              {
                title: 'Praktis & Lengkap',
                desc: 'Semua perlengkapan sudah terpaket, tinggal ambil dan pergi'
              },
              {
                title: 'Kualitas Terjamin',
                desc: 'Semua item dalam kondisi prima dan siap pakai'
              }
            ].map((benefit, idx) => (
              <Card key={idx}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaketCamping;
