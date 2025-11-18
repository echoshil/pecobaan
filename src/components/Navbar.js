import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { User, LogOut, LayoutDashboard, Menu, X, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">OC</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block" style={{ fontFamily: 'Space Grotesk' }}>
              OutdoorCamp
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
              Beranda
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition flex items-center">
                Katalog <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate('/katalog')}>
                  Semua Produk
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/katalog?kategori=Tenda')}>
                  Tenda & Shelter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/katalog?kategori=Carrier')}>
                  Tas Carrier
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/katalog?kategori=Sleeping')}>
                  Sleeping Gear
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/katalog?kategori=Masak')}>
                  Perlengkapan Masak
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/paket-camping" className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
              Paket Camping
            </Link>
            
            <Link to="/cara-sewa" className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
              Cara Sewa
            </Link>
            
            <Link to="/blog" className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
              Blog
            </Link>
            
            <Link to="/tentang-kami" className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
              Tentang Kami
            </Link>
            
            <Link to="/kontak" className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition">
              Kontak
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2" data-testid="user-menu-trigger">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user?.nama}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} data-testid="dashboard-link">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate('/admin')} data-testid="admin-link">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} data-testid="logout-button">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={() => navigate('/login')} data-testid="login-button">
                  Masuk
                </Button>
                <Button onClick={() => navigate('/register')} className="bg-green-600 hover:bg-green-700" data-testid="register-button">
                  Daftar
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              data-testid="mobile-menu-button"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white" data-testid="mobile-menu">
          <div className="px-4 py-3 space-y-2">
            <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg">
              Beranda
            </Link>
            <Link to="/katalog" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg">
              Katalog
            </Link>
            <Link to="/paket-camping" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg">
              Paket Camping
            </Link>
            <Link to="/cara-sewa" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg">
              Cara Sewa
            </Link>
            <Link to="/blog" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg">
              Blog
            </Link>
            <Link to="/tentang-kami" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg">
              Tentang Kami
            </Link>
            <Link to="/kontak" className="block px-4 py-2 text-gray-700 hover:bg-green-50 rounded-lg">
              Kontak
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
