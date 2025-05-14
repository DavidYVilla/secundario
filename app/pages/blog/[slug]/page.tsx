"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: { _id: string; text: string; user: string; createdAt: string }[];
}

const PostPage = () => {
  const { slug } = useParams(); // 🔥 Obtener el slug desde la URL
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
  
    api.get(`/posts/${slug}`)
      .then((response) => {
        if (!response.data) {
          console.error("El post no fue encontrado.");
          return;
        }
  
        console.log("Post recibido:", response.data);
        setPost(response.data);
      })
      .catch((error) => console.error("Error al obtener el post:", error))
      .finally(() => setLoading(false));
  }, [slug]);
  
  

    /// agregado recien
    if (loading) return (
      <div className="container mx-auto py-10 animate-pulse">
        <div className="h-10 w-2/3 bg-gray-300 rounded mx-auto mb-4"></div>
        <div className="max-w-4xl mx-auto">
          <div className="h-64 bg-gray-300 rounded-lg mb-6"></div>
          <div className="h-6 w-full bg-gray-300 rounded mb-4"></div>
          <div className="h-6 w-5/6 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
    // hasta aqui
  if (!post) return <p className="text-center text-red-500">Post no encontrado.</p>;

  return (

    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center text-primary leading-relaxed mb-6">{post.title}</h1>

      <div className="max-w-4xl mx-auto">
        <img src={post.image} alt={post.title} className="w-full rounded-lg shadow-lg mb-6"/>
        <p className="text-gray-700 leading-relaxed">{post.content}</p>

        {/* Likes y comentarios */}
        <div className="mt-6 flex items-center gap-4 text-gray-500">
          <span>❤️ {post.likes} Me gusta</span>
          <span>💬 {post.comments.length} Comentarios</span>
        </div>

        {/* Sección de comentarios */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Comentarios</h2>
          {post.comments.length === 0 ? (
            <p className="text-gray-500">Aún no hay comentarios.</p>
          ) : (
            <ul className="space-y-4">
  {post.comments.map((comment) => (
    <li key={comment._id} className="flex gap-4 border-b pb-4">
      <img 
        src={`/avatars/${comment.user}.png`} 
        alt={comment.user} 
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-primary-800">{comment.text}</p>
        <small className="text-gray-500">✍ {comment.user ?? "Usuario desconocido"} - {new Date(comment.createdAt).toLocaleDateString()}</small>
      </div>
    </li>
  ))}
</ul>
          )}
        </div>
      </div>    
    </div>
  );
};

export default PostPage;