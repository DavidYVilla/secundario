'use client';

import { useEffect, useState } from 'react';
import { fetchPosts } from '../../services/api';
import Link from 'next/link';

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: { _id: string; text: string; createdAt: string }[];
  category?: string[]; // ✅ Se añade "?" para manejar valores opcionales
}

const BlogPage = () => {
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

      setVisiblePosts(data.posts);
      setTotalPages(data.totalPages);
      setPage(currentPage);
    } catch (err) {
      console.error('Error al cargar posts:', err);
      setError('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(selectedCategory, 1);
  }, [selectedCategory]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Mi Blog Personal</h1>

      {/* Filtros de categorías */}
      <div className="flex space-x-4 justify-center mt-6 pb-6">
        {['Tecnología', 'Ciencia', 'Política', 'Negocios', 'Todos'].map(
          (category) => (
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
          )
        )}
      </div>

      {loading && (
        <p className="text-center text-gray-500">⏳ Cargando posts...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Mostrar los posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <Link key={post._id} href={`/blog/${post._id}`} className="block">
              <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover transition-opacity hover:opacity-80"
                />
                <div className="p-4 relative flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {post.content.slice(0, 100)}...
                  </p>

                  {/* Categorías con validación de existencia */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {post.category && Array.isArray(post.category) ? (
                      post.category.map((cat) => (
                        <span
                          key={cat}
                          className="px-3 py-1 text-sm font-medium bg-secondary dark:bg-primary text-white rounded-full shadow-sm"
                        >
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">
                        Sin categoría
                      </span>
                    )}
                  </div>

                  {/* Likes y comentarios */}
                  <div className="flex justify-between items-center mt-4 text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No hay posts disponibles.</p>
        )}
      </div>

      {/* Paginación mejorada */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => loadPosts(selectedCategory, page - 1)}
          disabled={page === 1}
          className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
            page === 1
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-primary dark:bg-secondary text-white hover:scale-105 shadow-md'
          }`}
        >
          ⬅
        </button>

        <div className="px-4 py-2 text-lg font-semibold bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm">
          {page} / {totalPages}
        </div>

        <button
          onClick={() => loadPosts(selectedCategory, page + 1)}
          disabled={page === totalPages}
          className={`p-3 rounded-full flex items-center justify-center transition-all duration-300 ${
            page === totalPages
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-primary dark:bg-secondary text-white hover:scale-105 shadow-md'
          }`}
        >
          ➡
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
