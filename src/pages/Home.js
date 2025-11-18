import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Mountain, Shield, Headphones, TrendingUp, Star, ArrowRight } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get(`${API}/products`);
      setFeaturedProducts(response.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-white to-orange-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  🏕️ Rental Terpercaya #1 di Indonesia
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" style={{ fontFamily: 'Space Grotesk' }} data-testid="hero-title">
                Wujudkan Petualangan <span className="gradient-text">Outdoor</span> Impianmu
              </h1>
              <p className="text-lg text-gray-600" data-testid="hero-subtitle">
                Sewa peralatan camping berkualitas dengan harga terjangkau. 
                Mulai dari tenda, carrier, hingga perlengkapan lengkap untuk petualanganmu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-lg px-8 btn-hover"
                  onClick={() => navigate('/katalog')}
                  data-testid="cta-explore-button"
                >
                  Jelajahi Produk <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 border-2 btn-hover"
                  onClick={() => navigate('/paket-camping')}
                  data-testid="cta-packages-button"
                >
                  Lihat Paket
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <p className="text-3xl font-bold text-green-600" style={{ fontFamily: 'Space Grotesk' }}>500+</p>
                  <p className="text-sm text-gray-600">Produk Tersedia</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600" style={{ fontFamily: 'Space Grotesk' }}>2K+</p>
                  <p className="text-sm text-gray-600">Pelanggan Puas</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600" style={{ fontFamily: 'Space Grotesk' }}>4.8</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=600&fit=crop" 
                  alt="Camping" 
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-full h-full bg-gradient-to-br from-green-200 to-orange-200 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Produk Terjamin</h3>
                <p className="text-sm text-gray-600">Semua peralatan berkualitas dan terawat dengan baik</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Harga Terjangkau</h3>
                <p className="text-sm text-gray-600">Harga sewa kompetitif untuk semua kalangan</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Support 24/7</h3>
                <p className="text-sm text-gray-600">Siap membantu kapan saja via WhatsApp</p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg hover:shadow-xl transition">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mountain className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>Panduan Lengkap</h3>
                <p className="text-sm text-gray-600">Tips & trik untuk petualangan outdoor-mu</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }} data-testid="featured-title">
              Produk <span className="gradient-text">Terpopuler</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Peralatan camping pilihan yang paling banyak disewa oleh para petualang
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6" data-testid="featured-products-grid">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2"
              onClick={() => navigate('/katalog')}
              data-testid="view-all-products-button"
            >
              Lihat Semua Produk <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
              Kata Mereka Tentang <span className="gradient-text">OutdoorCamp</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { nama: 'Budi Santoso', rating: 5, text: 'Pelayanan sangat memuaskan! Peralatan lengkap dan berkualitas. Pasti sewa lagi untuk trip berikutnya.' },
              { nama: 'Siti Nurhaliza', rating: 5, text: 'Harga terjangkau, proses booking mudah, dan barang sesuai deskripsi. Recommended banget!' },
              { nama: 'Andi Wijaya', rating: 5, text: 'Sudah beberapa kali sewa di sini, never disappointed. Admin responsif dan helpful.' }
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold" style={{ fontFamily: 'Space Grotesk' }}>- {testimonial.nama}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Siap Memulai Petualangan?
          </h2>
          <p className="text-xl mb-8 text-green-50">
            Daftar sekarang dan dapatkan penawaran terbaik untuk rental pertamamu!
          </p>
          <Button 
            size="lg" 
            className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 btn-hover"
            onClick={() => navigate('/register')}
            data-testid="cta-register-button"
          >
            Daftar Sekarang
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
