import axios from "axios";

const API_URL = "http://localhost:5000"; // 🔥 Configura la URL correcta

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Función para obtener los posts
export const fetchPosts = async (category?: string, page = 1, limit = 5) => {
  try {
    const params: { page: number; limit: number; category?: string } = { page, limit };
    if (category) params.category = category;

    const response = await api.get("/posts", { params });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo posts:", error);
    throw error;
  }
};
export const fetchPostBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/posts/${slug}`);
    return response.data;
    
  } catch (error) {
    console.error("Error obteniendo post:", error);
    throw error;
  }
};

export default api;