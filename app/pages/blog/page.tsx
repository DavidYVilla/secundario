'use client';

import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import DOMPurify from 'dompurify';

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  likes: number;
  comments: { _id: string; text: string; createdAt: string }[];
  categories?: string[];
}

const BlogPage = () => {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('guest');

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserRole(localStorage.getItem('role') || 'guest');
      setIsAuthenticated(!!localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    if (selectedCategory !== undefined) {
      loadPosts(selectedCategory, 1);
    }
  }, [selectedCategory]);

  const loadPosts = async (category: string | null, currentPage = 1) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPosts(category, currentPage);

      if (!data || !data.posts || data.posts.length === 0) {
        setError('No hay posts disponibles en esta categoría.');
        setVisiblePosts([]);
        return;
      }

      const timestamp = Math.floor(Date.now() / 10000);
      const processedPosts = data.posts.map((post) => ({
        ...post,
        image: post.image.startsWith('/uploads')
          ? `http://localhost:5000${post.image}?t=${timestamp}`
          : `${post.image}?t=${timestamp}`,
      }));

      setVisiblePosts(processedPosts);
      setTotalPages(data.totalPages);
      setPage(currentPage);
    } catch (err) {
      console.error('❌ Error al cargar posts:', err);
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para dar like.');
      return;
    }

    try {
      await fetch(`http://localhost:5000/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log('✅ Like enviado!');
    } catch (error) {
      console.error('❌ Error al dar like:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      {userRole === 'admin' && (
        <div className="text-center mb-6">
          <Link href="/pages/blog/newpost">
            <button className="px-4 py-2 bg-secondary text-white rounded-lg shadow-md hover:bg-blue-600 transition">
              ➕ Crear Nuevo Post
            </button>
          </Link>
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-8">Mi Blog Personal</h1>

      <div className="flex space-x-4 justify-center mt-6 pb-6">
        {[
          'Tecnología',
          'Ciencia',
          'Política',
          'Negocios',
          'Poesía',
          'Todos',
        ].map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category === 'Todos' ? null : category)
            }
            className={`px-4 py-2 rounded-lg transition ${
              selectedCategory === category ||
              (selectedCategory === null && category === 'Todos')
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-500">⏳ Cargando posts...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <div
              key={post._id}
              className="block bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105"
            >
              <Link href={`/pages/blog/${post.slug}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover transition-opacity hover:opacity-80"
                />
              </Link>

              <div className="p-4 relative flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {post.title}
                </h2>

                <div
                  className="text-lg text-gray-700 dark:text-gray-300 mt-8 leading-relaxed px-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      post.content.slice(0, 100) || ''
                    ),
                  }}
                />

                <div className="flex flex-wrap gap-2 mt-2">
                  {post.categories && Array.isArray(post.categories) ? (
                    post.categories.map((cat, index) => (
                      <span
                        key={`${cat}-${index}`}
                        className="px-3 py-1 text-sm font-medium bg-secondary dark:bg-primary text-white rounded-full shadow-sm"
                      >
                        {cat}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">Sin categoría</span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(post._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ❤️ {post.likes}
                    </button>
                    <span>💬 {post.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay posts disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
