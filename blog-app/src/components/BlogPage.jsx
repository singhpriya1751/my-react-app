import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";

const BlogPage = () => {
  const { id } = useParams();
  console.log("Post ID from URL:", id);

  const posts = useSelector((state) => state.blog.posts);
  console.log("Posts from Redux:", posts);

  const post = posts.find((p) => p.id === parseInt(id, 10));
  console.log("Found post:", post);

  if (!post) {
    return <Typography variant="h6">Blog not found</Typography>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2, overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="400"
          image={post.coverImage}
          alt={post.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
            {post.title}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {post.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlogPage;
