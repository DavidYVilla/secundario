"use client";

import { useEffect, useState } from "react";
import api from "@/app/utils/api";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: { _id: string; text: string; createdAt: string }[];
  category: string[]; // 🔥 Ahora `category` es un array de strings
}

const BlogPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]); // 🔥 Los posts que se están mostrando
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const [error, setError] = useState(null);

  const fetchPosts = async (category: string | null ,currentPage = page) => {
    try {
      console.log("Intentando cargar posts... Página:", currentPage);
      
      const params: { page: number; limit: number; category?: string } = { page: currentPage, limit: 4 }; // siempre iniciar desde la pagina 1 al cambiar de categoria
  
      if (category) params.category = category;

  
      const response = await api.get("/posts", { params });
  
      setVisiblePosts(prevPosts => [...prevPosts, ...response.data.posts]);

      if (response.data.posts.length > 0) {
        setPage(prev => prev + 1); // 🔥 Solo aumentar página si hubo resultados
      }
  
    } catch (err) {
      console.error("Error detectado:", err.message);
      setError("No se pudo conectar con el servidor. Inténtalo más tarde.");
    }
  };

  const changeCategory = (category: string) => {
    console.log("Categoría seleccionada:", category);
    
    const selectedCategory = category === "Todos" ? null : category; // 🔥 Convierte "Todos" en `null`
    
    setSelectedCategory(selectedCategory);
    setVisiblePosts([]); //limpiar los post anteriores antes de cargar los nuevos
    setPage(1); //Reinicia la paginación

    fetchPosts(selectedCategory, 1); // 🔥 Llama `fetchPosts()` con `null` si es "Todos"
  };
  const loadMorePosts = () => {
    let postsToConsider = selectedCategory
      ? allPosts.filter(post => post.category.includes(selectedCategory))
      : allPosts;
  
    const newPosts = postsToConsider.slice(visiblePosts.length, visiblePosts.length + 4);
    setVisiblePosts(prev => [...prev, ...newPosts]);
  };
  const filteredPosts = allPosts.filter(post => 
    Array.isArray(post.category) && post.category.includes(selectedCategory)
  );
  0
  useEffect(() => {
    api.get(`/posts?page=1&limit=1000`) // 🔥 Traemos 8 en lugar de 4 al inicio
      .then(response => {
 
        const totalPosts = response.data.total; // 🔥 Tomamos el número total de posts
 
  
  
        setAllPosts(response.data.posts);
        setVisiblePosts(response.data.posts.slice(0, 4)); // 🔥 Inicialmente solo mostramos 4
        setPage(2); // 🔥 Configuramos la siguiente página
      })
      .catch(error => console.error("Error al cargar posts:", error));
  }, []);


  
  useEffect(() => {
  
    if (selectedCategory) {
      const filteredPosts = allPosts.filter(post => 
        Array.isArray(post.category) && post.category.includes(selectedCategory)
      );
      console.log("Posts filtrados:", filteredPosts); // 🔥 Verifica si el filtro está funcionando
      setVisiblePosts(filteredPosts.slice(0, 4));
    } else {
      setVisiblePosts(allPosts.slice(0, 4));
    }
  }, [selectedCategory, allPosts]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Mi Blog Personal</h1>
      <div className="flex space-x-4 justify-center mt-6 pb-6">
      {["Tecnología", "Ciencia", "Política", "Negocios", "Todos"].map((category) => (
  <button
    key={category}
    onClick={() => changeCategory(category)}
    className={`px-4 py-2 rounded-lg ${
      selectedCategory === category || (selectedCategory === null && category === "Todos")
        ? "bg-primary text-white"
        : "bg-gray-200 text-gray-800"
    } transition`}
  >
    {category}
  </button>
))}
  
</div>  

{error && (
  <div className="flex flex-col items-center gap-4">
    <div className="bg-green-500 text-white p-4 rounded-md">{error}</div>
    <button
      onClick={() => fetchPosts(selectedCategory)}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
      Intentar nuevamente...
    </button>
  </div>
)}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visiblePosts.map((post, index) => (
  <Link key={`${post._id}-${index}`} href={`/blog/${post._id}`} className="block">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover transition-opacity duration-500 hover:opacity-80"
              />
              <div className="p-4 relative">
                <h2 className="text-xl font-semibold text-gray-800">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {post.content.slice(0, 100)}...
                </p>

                {/* Likes y comentarios (informativo) */}
                <div className="absolute bottom-3 right-4 flex items-center gap-3 text-gray-500 text-sm">
                  <span className="flex items-center gap-1">
                    ❤️ {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    💬 {post.comments.length}
                  </span>
                </div>
          
                <button className="mt-3 text-blue-500 hover:underline">
                  Leer más
                </button>
                  {/* Mostrar categorías */}
                <div className="mt-2 flex flex-wrap gap-2">
                 {post.category?.map((cat) => (
                    <span key={`${post._id}-${cat}`} className="bg-gray-200 px-2 py-1 rounded text-xs">
                      {cat}
                    </span>
                  ))}


              </div>
            </div>
            </div>
          </Link>
        ))}
      </div>
      


      {/* Botón para cargar más posts */}
     {visiblePosts.length < allPosts.length && (
  <div className="flex justify-center mt-6">
    <button
      onClick={() => fetchPosts(selectedCategory, page)}
      className="bg-secondary text-primary px-8 py-3 rounded-lg shadow-md hover:bg-secondary hover:text-white transition-all duration-300"
    >
      Cargar más
    </button>
  </div>
)}


    </div>
  );
};

export default BlogPage;
