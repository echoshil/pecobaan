import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Kontak = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/6281234567890', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }} data-testid="kontak-title">
            Hubungi Kami
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            Kami siap membantu Anda merencanakan petualangan outdoor yang sempurna
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Alamat</h3>
                <p className="text-sm text-gray-600">
                  Jl. Petualangan No. 123<br />
                  Jakarta Selatan, 12345
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Telepon</h3>
                <p className="text-sm text-gray-600">
                  +62 812-3456-7890<br />
                  +62 821-9876-5432
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Email</h3>
                <p className="text-sm text-gray-600">
                  info@outdoorcamp.com<br />
                  support@outdoorcamp.com
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Jam Operasional</h3>
                <p className="text-sm text-gray-600">
                  Senin - Minggu<br />
                  08.00 - 20.00 WIB
                </p>
              </CardContent>
            </Card>
          </div>

          {/* WhatsApp CTA */}
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                Butuh Bantuan Cepat?
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Hubungi kami melalui WhatsApp untuk respon yang lebih cepat. 
                Tim kami siap membantu Anda 24/7!
              </p>
              <Button 
                size="lg"
                className="bg-green-600 hover:bg-green-700"
                onClick={handleWhatsApp}
                data-testid="whatsapp-button"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat di WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Lokasi Kami
            </h2>
            <p className="text-gray-600">
              Kunjungi toko kami untuk melihat langsung koleksi peralatan camping
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl h-96 bg-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.23149457933!2d106.68942979999999!3d-6.229386500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta%2C%20Indonesia!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Pertanyaan Umum
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Bagaimana cara menyewa peralatan?',
                a: 'Anda bisa menyewa melalui website dengan mendaftar, memilih produk, menentukan tanggal, dan melakukan pembayaran.'
              },
              {
                q: 'Apakah ada deposit?',
                a: 'Tidak ada deposit khusus, namun Anda perlu upload KTP sebagai jaminan.'
              },
              {
                q: 'Bagaimana jika terlambat mengembalikan?',
                a: 'Keterlambatan akan dikenakan denda Rp 50.000 per hari.'
              },
              {
                q: 'Apakah bisa antar-jemput?',
                a: 'Saat ini belum ada layanan antar-jemput. Anda perlu mengambil dan mengembalikan barang di lokasi kami.'
              }
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">{faq.a}</p>
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

export default Kontak;
