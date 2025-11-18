import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Search, SlidersHorizontal } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Katalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedKategori, setSelectedKategori] = useState(searchParams.get('kategori') || '');
  const [minHarga, setMinHarga] = useState('');
  const [maxHarga, setMaxHarga] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Semua',
    'Tenda',
    'Carrier',
    'Sleeping',
    'Masak',
    'Hiking',
    'Lighting'
  ];

  useEffect(() => {
    fetchProducts();
  }, [selectedKategori, search, minHarga, maxHarga]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedKategori && selectedKategori !== 'Semua') params.append('kategori', selectedKategori);
      if (search) params.append('search', search);
      if (minHarga) params.append('min_harga', minHarga);
      if (maxHarga) params.append('max_harga', maxHarga);

      const response = await axios.get(`${API}/products?${params.toString()}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKategoriChange = (kategori) => {
    setSelectedKategori(kategori === 'Semua' ? '' : kategori);
    if (kategori !== 'Semua') {
      setSearchParams({ kategori });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-orange-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }} data-testid="katalog-title">
            Katalog Produk
          </h1>
          <p className="text-lg text-green-50">Temukan peralatan camping terbaik untuk petualanganmu</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-testid="search-input"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:w-auto"
            data-testid="filter-toggle-button"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3" style={{ fontFamily: 'Space Grotesk' }}>Kategori</h3>
                  <div className="space-y-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => handleKategoriChange(cat)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition ${
                          (cat === 'Semua' && !selectedKategori) || selectedKategori === cat
                            ? 'bg-green-100 text-green-700 font-medium'
                            : 'hover:bg-gray-100'
                        }`}
                        data-testid={`category-filter-${cat.toLowerCase()}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="harga">
                    <AccordionTrigger data-testid="price-filter-accordion">
                      <span className="font-semibold" style={{ fontFamily: 'Space Grotesk' }}>Rentang Harga</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-2">
                        <div>
                          <Label htmlFor="min-harga" className="text-sm">Harga Minimum</Label>
                          <Input
                            id="min-harga"
                            type="number"
                            placeholder="0"
                            value={minHarga}
                            onChange={(e) => setMinHarga(e.target.value)}
                            data-testid="min-price-input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="max-harga" className="text-sm">Harga Maximum</Label>
                          <Input
                            id="max-harga"
                            type="number"
                            placeholder="1000000"
                            value={maxHarga}
                            onChange={(e) => setMaxHarga(e.target.value)}
                            data-testid="max-price-input"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {(selectedKategori || search || minHarga || maxHarga) && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedKategori('');
                      setSearch('');
                      setMinHarga('');
                      setMaxHarga('');
                      setSearchParams({});
                    }}
                    data-testid="reset-filters-button"
                  >
                    Reset Filter
                  </Button>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600" data-testid="product-count">
                Menampilkan {products.length} produk
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="products-grid">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500" data-testid="no-products-message">Tidak ada produk yang ditemukan</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Katalog;
