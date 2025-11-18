import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Package } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card className="card-hover overflow-hidden cursor-pointer" onClick={() => navigate(`/produk/${product.id}`)} data-testid={`product-card-${product.id}`}>
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.nama}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}
        {product.stok < 3 && product.stok > 0 && (
          <Badge className="absolute top-3 right-3 bg-orange-500" data-testid="low-stock-badge">
            Stok Terbatas
          </Badge>
        )}
        {product.stok === 0 && (
          <Badge className="absolute top-3 right-3 bg-red-500" data-testid="out-of-stock-badge">
            Habis
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <Badge className="mb-2 bg-green-100 text-green-700 hover:bg-green-100" data-testid="category-badge">
          {product.kategori}
        </Badge>
        <h3 className="font-semibold text-lg mb-1 line-clamp-1" style={{ fontFamily: 'Space Grotesk' }} data-testid="product-name">
          {product.nama}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3" data-testid="product-description">
          {product.deskripsi}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-green-600" data-testid="product-price">
              Rp {product.harga_per_hari?.toLocaleString('id-ID')}
            </p>
            <p className="text-xs text-gray-500">per hari</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium" data-testid="product-stock">Stok: {product.stok}</p>
            {product.kapasitas && (
              <p className="text-xs text-gray-500" data-testid="product-capacity">{product.kapasitas}</p>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          disabled={product.stok === 0}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/produk/${product.id}`);
          }}
          data-testid="view-detail-button"
        >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
};
