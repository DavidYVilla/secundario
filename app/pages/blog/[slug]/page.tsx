'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { fetchPostBySlug } from '../../../services/api';
import AuthModal from '../../../components/AuthModal';

import ReturnButton from '../../../components/ReturnBlogBotton';
import DOMPurify from 'dompurify';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

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

  return (
    <div className="container mx-auto py-10">
      {loading ? (
        <p>⏳ Cargando...</p>
      ) : !post ? (
        <p>❌ Post no encontrado.</p>
      ) : (
        <PostDetail
          post={post}
          isAuthenticated={isAuthenticated}
          setShowAuthModal={setShowAuthModal}
          commentText={commentText}
          setCommentText={setCommentText}
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
  isAuthenticated,
  setShowAuthModal,
  commentText,
  setCommentText,
}) => {
  const [postState, setPostState] = useState(post);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAuthModal] = useState(false);
  const allCategories = [
    'Tecnología',
    'Ciencia',
    'Política',
    'Negocios',
    'Poesía',
  ];

  const userRole =
    typeof window !== 'undefined' ? localStorage.getItem('role') : 'guest';

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleEditPost = async () => {
    try {
      const postData = {
        title: postState.title,
        content: postState.content,
        image: postState.image,
        categories: postState.categories || [],
      };

      const response = await fetch(`${API_URL}/posts/${postState.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.status === 403) {
        console.warn('⚠️ Token inválido. Redirigiendo a autenticación...');
        setShowAuthModal(true);
        return;
      }

      if (response.ok) {
        console.log('✅ Post actualizado correctamente:', postState.slug);
        setIsEditing(false);
      } else {
        console.error('❌ Error al editar post:', await response.json());
      }
    } catch (error) {
      console.error('❌ Error en la solicitud de edición:', error);
    }

    if (postState.newImageFile) {
      // 🔥 Solo si hay una nueva imagen
      const formData = new FormData();
      formData.append('image', postState.newImageFile);
      formData.append('slug', postState.slug);

      const imageResponse = await fetch(`${API_URL}/upload-image`, {
        method: 'POST',
        body: formData,
      });
      if (imageResponse.status === 403) {
        console.warn('⚠️ Token inválido. Redirigiendo a autenticación...');
        setShowAuthModal(true);
        return;
      }

      if (imageResponse.ok) {
        const { imageUrl } = await imageResponse.json();
        postData.image = imageUrl; // 🔥 Se usa la nueva URL en la edición del post
      } else {
        console.error('❌ Error al subir imagen:', await imageResponse.json());
      }
    } else {
      postData.image = postState.image; // 🔥 Mantiene la imagen actual si no ha cambiado
    }
  };
  const handleLike = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts/${postState.slug}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 403) {
        console.warn('⚠️ Token inválido. Redirigiendo a autenticación...');
        setShowAuthModal(true);
        return;
      }

      if (response.ok) {
        setPostState((prevPost) => ({
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
      const response = await fetch(`${API_URL}/comments/${postState.slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ text: trimmedText }),
      });

      const data = await response.json();
      console.log('📌 Respuesta de la API:', data);

      if (response.ok) {
        setPostState((prevPost) => ({
          ...prevPost,
          comments: [
            ...prevPost.comments,
            { ...data.comment, user: { username: data.comment.username } }, // 🔥 Se ajusta la estructura
          ],
        }));
        setCommentText(''); // 🔥 Se limpia el campo de comentarios
      } else {
        console.error('❌ Error al enviar comentario:', data.message);
      }
    } catch (error) {
      console.error('❌ Error en la solicitud a la API:', error);
    }
  };
  const handleDeletePost = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/${postState.slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        console.log('✅ Post eliminado correctamente.');
        setShowDeleteModal(false); // oculta la modal despues de eliminar
        router.push('/pages/blog'); // 🔥 Redirige al usuario después de eliminar el post
      } else {
        console.error('❌ Error al eliminar el post:', await response.json());
      }
    } catch (error) {
      console.error('❌ Error en la solicitud de eliminación:', error);
    }
  };

  const PostCategoryEditor = ({ allCategories, initialCategories = [] }) => {
    const [selectedCategories, setSelectedCategories] =
      useState(initialCategories);

    const toggleCategory = (category) => {
      setPostState((prevState) => ({
        ...prevState,
        categories: prevState.categories.includes(category)
          ? prevState.categories.filter((c) => c !== category) // 🔥 Se elimina si ya estaba seleccionada
          : [...prevState.categories, category], // 🔥 Se agrega si no estaba en el array
      }));
    };

    return (
      <div>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}{' '}
        {/* 🔥 Renderiza el modal si es necesario */}
        <div className="flex gap-2 flex-wrap">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm ${
                selectedCategories.includes(category)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          onClick={handleSaveChanges}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Guardar cambios
        </button>
      </div>
    );
  };

  // 🔥 Llamada del componente desde `PostDetail.tsx`
  const handleSaveChanges = async (categories) => {
    try {
      const postData = {
        title: postState.title,
        content: postState.content,
        categories: postState.categories || [],
      };

      if (postState.newImageFile) {
        // 🔥 Solo si hay una nueva imagen
        const formData = new FormData();
        formData.append('image', postState.newImageFile);
        formData.append('slug', postState.slug);

        const imageResponse = await fetch(`${API_URL}/upload-image`, {
          method: 'POST',
          body: formData,
        });
        if (imageResponse.status === 403) {
          console.warn('⚠️ Token inválido. Redirigiendo a autenticación...');
          setShowAuthModal(true);
          return;
        }

        if (imageResponse.ok) {
          const { imageUrl } = await imageResponse.json();
          postData.image = imageUrl; // 🔥 Se usa la nueva URL en la actualización del post
          setPostState((prev) => ({
            ...prev,
            image: imageUrl, // 🔥 Se actualiza la imagen en la pantalla sin recargar
            newImageFile: null, // 🔥 Limpia el estado del archivo después de guardar
          }));
        } else {
          console.error(
            '❌ Error al subir imagen:',
            await imageResponse.json()
          );
        }
      }

      const response = await fetch(`${API_URL}/posts/${postState.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(postData),
      });

      if (imageResponse.status === 403) {
        console.warn('⚠️ Token inválido. Redirigiendo a autenticación...');
        setShowAuthModal(true);
        return;
      }
      if (response.ok) {
        console.log('✅ Post actualizado correctamente.');
      } else {
        console.error('❌ Error al actualizar post:', await response.json());
      }
    } catch (error) {
      console.error('❌ Error en la solicitud de edición:', error);
    }
  };

  <PostCategoryEditor
    allCategories={['Tecnología', 'Ciencia', 'Política', 'Negocios', 'Poesía']}
    initialCategories={postState?.categories || []}
  />;
  // 🔥 Usa la imagen actual del post o un placeholder si no tiene una
  const imageUrl = postState.image?.startsWith('/uploads')
    ? `http://localhost:5000${postState.image}` // 🔥 Agrega el dominio si la ruta es relativa
    : postState.image || `/imagenes/blog/default.png`; // 🔥 Usa la imagen del post o un placeholder

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imagePreview = URL.createObjectURL(file); // 🔥 Vista previa de la imagen sin guardarla aún
    setPostState((prev) => ({
      ...prev,
      image: imagePreview, // 🔥 Se muestra la imagen en el frontend sin recargar
      newImageFile: file, // 🔥 Se almacena el archivo para enviarlo solo cuando se confirmen los cambios
    }));
  };

  const handleSaveImagen = async () => {
    console.log('Guardando en BD:', categories);
    setPostState((prev) => ({ ...prev, categories }));
    handleSaveImagen();
  };

  function MyComponent() {
    const [value, setValue] = useState('');

    return <ReactQuill theme="snow" value={value} onChange={setValue} />;
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <ReturnButton />
      <h1
        className={`text-4xl font-bold text-center mb-8 ${
          isEditing
            ? 'cursor-pointer border-b-4 pb-2 border-secondary dark:border-primary'
            : ''
        }`}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onBlur={(e) =>
          setPostState({ ...postState, title: e.target.textContent })
        }
      >
        {postState?.title}
      </h1>

      <div className="flex flex-col items-center justify-center gap-6">
        <img
          src={imageUrl}
          alt="Imagen del post"
          className="w-[500px] h-[300px] object-cover rounded-lg shadow-lg border-2 border-secondary dark:border-primary"
        />

        {isEditing && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer px-5 py-3 bg-primary dark:bg-secondary text-white rounded-lg shadow hover:bg-primary-dark"
            >
              Seleccionar nueva imagen
            </label>
          </>
        )}
      </div>

      <div
        className={`text-lg text-gray-700 dark:text-gray-300 mt-8 leading-relaxed ${
          isEditing
            ? 'cursor-pointer border p-4 rounded-md border-secondary dark:border-primary shadow-sm'
            : 'px-2'
        }`}
      >
        {isEditing ? (
          <ReactQuill
            theme="snow"
            value={postState?.content}
            onChange={(content) => setPostState({ ...postState, content })}
          />
        ) : (
          <div
            className="text-lg text-gray-700 dark:text-gray-300 mt-8 leading-relaxed px-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(postState?.content || ''),
            }}
          />
        )}
      </div>

      {isEditing && (
        <div className="mt-6">
          <PostCategoryEditor
            allCategories={[
              'Tecnología',
              'Ciencia',
              'Política',
              'Negocios',
              'Poesía',
            ]}
            initialCategories={postState?.categories || []}
          />
        </div>
      )}

      {userRole === 'admin' && (
        <div className="mt-8 flex gap-6 justify-center">
          <button
            onClick={toggleEditing}
            className="bg-yellow-500 text-white px-5 py-3 rounded-lg hover:bg-yellow-600 shadow"
          >
            {isEditing ? '💾 Guardar cambios' : '✏️ Editar Post'}
          </button>
          {isEditing && (
            <button
              onClick={handleEditPost}
              className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-600 shadow"
            >
              ✅ Confirmar edición
            </button>
          )}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 shadow"
          >
            🗑️ Eliminar Post
          </button>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600">⚠️ Advertencia</h2>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Esta acción eliminará el post y todos sus comentarios de manera
              irreversible. ¿Seguro que quieres continuar?
            </p>
            <div className="mt-6 flex justify-center gap-6">
              <button
                onClick={handleDeletePost}
                className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 shadow"
              >
                ✅ Sí, eliminar
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600 shadow"
              >
                ❌ Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10">
        <button
          onClick={handleLike}
          className="px-5 py-3 rounded-lg bg-primary dark:bg-secondary text-white hover:bg-red-500 shadow"
        >
          ❤️ {postState?.likes}
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mt-6">
          Comentarios
        </h2>

        {postState?.comments?.length > 0 ? (
          postState.comments.map(
            (comment) =>
              comment?.text && (
                <div
                  key={comment._id}
                  className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg mb-3 shadow-sm flex justify-between"
                >
                  <div>
                    <p>{comment.text}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {comment.user?.username || 'Usuario desconocido'}
                    </p>
                  </div>
                  {isAuthenticated &&
                    (userRole === 'admin' || userRole === 'moderator') && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    )}
                </div>
              )
          )
        ) : (
          <p className="text-gray-500 mt-3">No hay comentarios aún.</p>
        )}

        {isAuthenticated && (
          <div className="mt-8 flex flex-col items-center">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="p-3 border rounded w-full max-w-md bg-gray-100 dark:bg-gray-800"
              placeholder="Escribe tu comentario..."
            />
            <button
              onClick={handleComment}
              className="mt-3 px-6 py-3 bg-secondary dark:bg-primary text-white rounded-lg hover:bg-secondary-dark shadow"
            >
              📝 Enviar comentario
            </button>
          </div>
        )}
      </div>
      <ReturnButton />
    </div>
  );
};
export default Page;
