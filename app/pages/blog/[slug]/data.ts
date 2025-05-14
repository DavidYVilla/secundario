import api from "@/app/utils/api";

export async function generateStaticParams() {
  const response = await api.get("/posts");
  return response.data.map((post: { _id: string }) => ({
    slug: post._id,
  }));
}