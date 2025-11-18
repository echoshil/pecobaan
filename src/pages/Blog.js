import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

import { Calendar, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Vite uses import.meta.env, NOT process.env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch data blog dari backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback dummy jika backend kosong
  const dummyPosts = [
    {
      id: "1",
      judul: "10 Tips Camping untuk Pemula",
      excerpt:
        "Panduan lengkap untuk kamu yang baru pertama kali camping. Mulai dari persiapan hingga tips survival.",
      kategori: "Tips",
      gambar:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=500&fit=crop",
      author: "Admin",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      judul: "Rekomendasi Destinasi Camping Terbaik di Indonesia",
      excerpt:
        "Jelajahi 15 lokasi camping terbaik di Indonesia yang wajib kamu kunjungi untuk pengalaman outdoor yang tak terlupakan.",
      kategori: "Destinasi",
      gambar:
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=500&fit=crop",
      author: "Admin",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      judul: "Cara Memilih Tenda yang Tepat",
      excerpt:
        "Panduan memilih tenda sesuai kebutuhan, mulai dari tenda hiking ringan hingga tenda family untuk camping bersama keluarga.",
      kategori: "Panduan",
      gambar:
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=500&fit=crop",
      author: "Admin",
      created_at: new Date().toISOString(),
    },
  ];

  const displayPosts = posts.length > 0 ? posts : dummyPosts;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "Space Grotesk" }}
          >
            Blog & Artikel
          </h1>
          <p className="text-xl text-green-50 max-w-2xl mx-auto">
            Tips, panduan, dan inspirasi untuk petualangan outdoor Anda
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post) => (
            <Card
              key={post.id}
              className="card-hover overflow-hidden cursor-pointer"
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img
                  src={post.gambar}
                  alt={post.judul}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-6">
                <Badge className="mb-3 bg-green-100 text-green-700 hover:bg-green-100">
                  {post.kategori}
                </Badge>

                <h3
                  className="text-xl font-bold mb-3 line-clamp-2"
                  style={{ fontFamily: "Space Grotesk" }}
                >
                  {post.judul}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(post.created_at), "dd MMM yyyy", {
                        locale: id,
                      })}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-green-600 font-medium">
                  Baca Selengkapnya <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
