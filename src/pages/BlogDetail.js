import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams(); // postId tidak digunakan, jadi cukup 'id'
  const navigate = useNavigate();

  // Dummy post, bisa diganti fetch API nanti
  const post = {
    judul: '10 Tips Camping untuk Pemula',
    konten:
      'Camping adalah salah satu kegiatan outdoor yang paling menyenangkan. Berikut adalah 10 tips camping untuk pemula yang akan membantu Anda mempersiapkan petualangan outdoor pertama Anda.',
    kategori: 'Tips',
    gambar: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=600&fit=crop',
    author: 'Admin',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="py-12 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="mb-6 flex items-center"
            onClick={() => navigate('/blog')}
            data-testid="back-to-blog-button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Blog
          </Button>

          <Badge className="mb-4 bg-green-100 text-green-700">{post.kategori}</Badge>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk' }}>
            {post.judul}
          </h1>

          <div className="mb-8 rounded-2xl overflow-hidden">
            <img src={post.gambar} alt={post.judul} className="w-full h-96 object-cover" />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">{post.konten}</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetail;
