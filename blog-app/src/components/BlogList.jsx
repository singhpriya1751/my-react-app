import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import BlogCard from "./BlogCard";
import { useAuth } from "../AuthContext";

const BlogList = () => {
  const { user } = useAuth();
  console.log("my user is here", user);

  const isLoggedIn = () => {
    return !!user;
  };

  const posts = useSelector((state) => state.blog.posts);

  const navigate = useNavigate();

  const handleAddBlogClick = () => {
    if (isLoggedIn()) {
      navigate("/addNewBlog");
    } else {
      navigate("/login");
    }
  };

  const handleMyBlogsClick = () => {
    if (isLoggedIn()) {
      navigate("/my-blogs");
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddBlogClick}
        sx={{ marginBottom: 2, mt: 2, marginRight: 2 }}
      >
        Add Your Blog
      </Button>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleMyBlogsClick}
        sx={{ marginBottom: 2, mt: 2 }}
      >
        My Blogs
      </Button>

      <Grid container spacing={3} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
            <BlogCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
