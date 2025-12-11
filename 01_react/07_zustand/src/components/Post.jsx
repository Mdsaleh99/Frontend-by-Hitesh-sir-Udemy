import { useEffect } from "react";
import { usePostStore } from "../store/postStore";

export default function Post() {
  const { posts, loading, error, fetchPosts } = usePostStore();
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]); // anything changes in fetchPost() re-render this
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
