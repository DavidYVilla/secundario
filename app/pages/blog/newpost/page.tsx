'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import ReturnButton from '../../../components/ReturnBlogBotton';
import AuthModal from '../../../components/AuthModal';

// React-Quill con carga dinámica
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const categoriesList = [
  'Tecnología',
  'Ciencia',
  'Política',
  'Negocios',
  'Poesía',
];

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<string>('guest');
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserRole(localStorage.getItem('role') || 'guest');
    }
  }, []);

  // Manejo de imagen y previsualización
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Selección de categorías
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Subir la imagen y obtener la URL antes de enviar el post
  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(`${API_URL}/upload-image`, {
        method: 'POST',
        body: formData,
      });
      if (response.status === 403) {
        console.warn('⚠️ Token inválido. Redirigiendo a autenticación...');
        setShowAuthModal(true);
        return;
      }

      if (!response.ok) throw new Error('Error al subir la imagen');

      const { imageUrl } = await response.json();
      return imageUrl;
    } catch (error) {
      console.error('❌ Error al subir imagen:', error);
      return null;
    }
  };

  // Envío del post como JSON
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userRole !== 'admin') {
      alert('Solo los administradores pueden publicar.');
      return;
    }

    const sanitizedTitle = DOMPurify.sanitize(title);
    const sanitizedContent = DOMPurify.sanitize(content);

    // 🔥 Enviar post sin imagen primero
    const postData = {
      title: sanitizedTitle,
      content: sanitizedContent,
      categories: selectedCategories,
    };

    try {
      const postResponse = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(postData),
      });
      if (postResponse.status === 403) {
        console.warn('⚠️ Token inválido. Redirigiendo a autenticación...');
        setShowAuthModal(true);
        return;
      }
      if (!postResponse.ok) throw new Error('Error al enviar el post');

      const post = await postResponse.json();
      const { slug } = post; // 🔥 Obtener el slug generado

      // 🔥 Ahora subir la imagen con el slug
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('slug', slug); // ✅ Enviar el slug correcto

        const imageResponse = await fetch(`${API_URL}/upload-image`, {
          method: 'POST',
          body: formData,
        });
        if (imageResponse.status === 403) {
          console.warn('⚠️ Token inválido. Redirigiendo a autenticación...');
          setShowAuthModal(true);
          return;
        }
        if (!imageResponse.ok) throw new Error('Error al subir la imagen');
      }

      alert('✅ Post guardado exitosamente con imagen');
    } catch (error) {
      console.error('❌ Error al guardar el post:', error);
    }
  };

  return (
    <div className="container mx-auto py-10 max-w-lg bg-white p-6 rounded shadow-md">
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
      <ReturnButton />
      <h1 className="text-3xl font-bold text-center mb-8">Crear Nuevo Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Título con Input normal */}
        <label className="block">
          <span className="text-gray-700">Título:</span>
          <input
            type="text"
            className="mt-2 block w-full px-4 py-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        {/* Campo Contenido con ReactQuill */}
        <label className="block">
          <span className="text-gray-700">Contenido:</span>
          <ReactQuill
            value={content}
            onChange={setContent}
            className="mt-2 border rounded-md"
          />
        </label>

        {/* Imagen con previsualización */}
        <label className="block">
          <span className="text-gray-700">Imagen:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full border rounded-md"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Previsualización"
              className="mt-2 w-full h-40 object-cover rounded-md shadow-md"
            />
          )}
        </label>

        {/* Selección de Categorías */}
        <fieldset className="border p-4 rounded-md">
          <legend className="text-gray-700 font-semibold">Categorías:</legend>
          <div className="flex flex-wrap gap-4 mt-2">
            {categoriesList.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Botón Guardar */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700 transition"
        >
          Guardar Post
        </button>
      </form>
      <ReturnButton />
    </div>
  );
};

export default NewPost;
