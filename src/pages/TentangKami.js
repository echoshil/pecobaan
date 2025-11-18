import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Target, Award, Users, Heart } from 'lucide-react';

const TentangKami = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }} data-testid="tentang-kami-title">
            Tentang Kami
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            Mitra terpercaya untuk petualangan outdoor Anda
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Kisah Kami
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                OutdoorCamp didirikan dengan visi untuk membuat petualangan outdoor lebih mudah diakses oleh semua orang. 
                Kami percaya bahwa setiap orang berhak merasakan keindahan alam dan petualangan outdoor tanpa harus 
                mengeluarkan biaya besar untuk membeli perlengkapan.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Sejak 2020, kami telah melayani ribuan petualang yang ingin menjelajahi keindahan alam Indonesia. 
                Dengan komitmen pada kualitas dan pelayanan terbaik, kami terus berkembang menjadi salah satu 
                penyedia rental peralatan camping terpercaya di Indonesia.
              </p>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=400&fit=crop" 
                  alt="Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-green-200 to-orange-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Nilai-Nilai Kami
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Prinsip yang menjadi fondasi dalam setiap layanan kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Kualitas</h3>
                <p className="text-gray-600 text-sm">
                  Kami hanya menyediakan peralatan berkualitas tinggi yang terawat dengan baik
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Profesional</h3>
                <p className="text-gray-600 text-sm">
                  Pelayanan profesional dan responsif untuk kepuasan pelanggan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Komunitas</h3>
                <p className="text-gray-600 text-sm">
                  Membangun komunitas pecinta alam yang peduli lingkungan
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Kepuasan</h3>
                <p className="text-gray-600 text-sm">
                  Kepuasan pelanggan adalah prioritas utama kami
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-green-600 mb-2" style={{ fontFamily: 'Space Grotesk' }}>5+</p>
              <p className="text-gray-600">Tahun Berpengalaman</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-green-600 mb-2" style={{ fontFamily: 'Space Grotesk' }}>2K+</p>
              <p className="text-gray-600">Pelanggan Puas</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-green-600 mb-2" style={{ fontFamily: 'Space Grotesk' }}>500+</p>
              <p className="text-gray-600">Produk Tersedia</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-green-600 mb-2" style={{ fontFamily: 'Space Grotesk' }}>4.8</p>
              <p className="text-gray-600">Rating Pelanggan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Siap Bergabung dengan Kami?
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Mulai petualangan outdoor Anda bersama OutdoorCamp hari ini!
          </p>
          <button 
            className="px-8 py-3 bg-white text-green-600 hover:bg-gray-100 rounded-lg font-medium transition"
            onClick={() => window.location.href = '/katalog'}
            data-testid="join-us-button"
          >
            Jelajahi Katalog
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TentangKami;
