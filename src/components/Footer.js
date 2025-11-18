import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">OC</span>
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                OutdoorCamp
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Rental peralatan camping terlengkap dan terpercaya untuk petualangan outdoor Anda.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Menu</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-green-500 transition">Beranda</Link></li>
              <li><Link to="/katalog" className="hover:text-green-500 transition">Katalog</Link></li>
              <li><Link to="/paket-camping" className="hover:text-green-500 transition">Paket Camping</Link></li>
              <li><Link to="/cara-sewa" className="hover:text-green-500 transition">Cara Sewa</Link></li>
              <li><Link to="/blog" className="hover:text-green-500 transition">Blog</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Informasi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tentang-kami" className="hover:text-green-500 transition">Tentang Kami</Link></li>
              <li><Link to="/kontak" className="hover:text-green-500 transition">Kontak</Link></li>
              <li><a href="#" className="hover:text-green-500 transition">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-green-500 transition">Kebijakan Privasi</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-green-500" />
                <span>Jl. Petualangan No. 123<br />Jakarta Selatan</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-500" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-500" />
                <span>info@outdoorcamp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 OutdoorCamp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
