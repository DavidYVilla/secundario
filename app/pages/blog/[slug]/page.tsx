'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchPostBySlug } from '../../../services/api';
import AuthModal from '../../../components/AuthModal';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Page = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(!!localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const data = await fetchPostBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error('❌ Error al obtener post:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) getPost();
  }, [slug]);

  const handleLike = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts/${slug}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        setPost((prevPost) => ({
          ...prevPost,
          likes: prevPost.likes + 1,
        }));
      } else {
        console.error('❌ Error al dar like:', await response.json());
      }
    } catch (error) {
      console.error('❌ Error en la solicitud de like:', error);
    }
  };
  const handleComment = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const trimmedText = commentText.trim();
    if (!trimmedText) {
      alert('⚠️ El comentario no puede estar vacío.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/comments/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ text: trimmedText }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('✅ Comentario agregado:', data.comment);

        setPost((prevPost) => ({
          ...prevPost,
          comments: [
            ...prevPost.comments,
            {
              ...data.comment,
              username: data.comment.username, // ✅ Extraer `username` desde la API
            },
          ],
        }));

        setCommentText('');
      } else {
        console.error('❌ Error al enviar comentario:', data.message);
      }
    } catch (error) {
      console.error('❌ Error en la solicitud a la API:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <p>⏳ Cargando...</p>
      ) : !post ? (
        <p>❌ Post no encontrado.</p>
      ) : (
        <PostDetail
          post={post}
          handleLike={handleLike}
          handleComment={handleComment}
          commentText={commentText}
          setCommentText={setCommentText}
          isAuthenticated={isAuthenticated}
          setShowAuthModal={setShowAuthModal}
        />
      )}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => setIsAuthenticated(true)}
      />
    </div>
  );
};

const PostDetail = ({
  post,
  handleLike,
  handleComment,
  commentText,
  setCommentText,
  isAuthenticated,
  setShowAuthModal,
}) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-6">{post?.title}</h1>
      {post?.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full max-w-2xl mx-auto rounded-lg shadow-md mb-6"
        />
      )}
      <p className="text-lg text-gray-700 dark:text-gray-300">
        {post?.content}
      </p>

      {/* Sección de interacción */}
      <div className="flex justify-between items-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-lg ${
            isAuthenticated
              ? 'bg-primary dark:bg-secondary text-white'
              : 'bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
          } hover:bg-red-500`}
        >
          ❤️ {post?.likes}
        </button>
      </div>

      {/* Comentarios protegidos */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Comentarios
        </h2>

        {post?.comments?.length > 0 ? (
          post.comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-2 shadow-sm"
            >
              <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {comment.user?.username
                  ? `Por ${comment.user.username}`
                  : 'Usuario desconocido'}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay comentarios aún.</p>
        )}

        {isAuthenticated ? (
          <div className="flex flex-col gap-2 mt-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="p-2 border rounded w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Escribe tu comentario..."
            />
            <button
              onClick={handleComment}
              className="text-sm py-1 px-2 rounded-lg transition-colors duration-200 
             bg-secondary text-white hover:bg-secondary-dark 
             dark:bg-primary dark:hover:bg-primary-dark"
            >
              📝 Enviar comentario
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="mt-6 px-4 py-2 rounded-lg bg-secondary text-white"
          >
            🔒 Iniciar sesión para comentar
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
