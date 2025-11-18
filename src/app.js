import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

// Pages
import Home from './pages/Home';
import Katalog from './pages/Katalog';
import ProductDetail from './pages/ProductDetail';
import PaketCamping from './pages/PaketCamping';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import TentangKami from './pages/TentangKami';
import Kontak from './pages/Kontak';
import CaraSewa from './pages/CaraSewa';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/katalog" element={<Katalog />} />
            <Route path="/produk/:id" element={<ProductDetail />} />
            <Route path="/paket-camping" element={<PaketCamping />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/tentang-kami" element={<TentangKami />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/cara-sewa" element={<CaraSewa />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
