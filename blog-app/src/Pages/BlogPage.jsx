import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogPage = () => {
  const { id } = useParams();
  const post = useSelector((state) =>
    state.blog.posts.find((p) => p.id === id)
  );

  if (!post) return <div>Post not found</div>;

  return (
    <div>
      <img src={post.coverImage} alt={post.title} />
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  );
};

export default BlogPage;
