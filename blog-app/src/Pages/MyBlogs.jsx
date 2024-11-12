import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const db = getFirestore(app);

function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await deleteDoc(doc(db, "blogs", blogId));

      setBlogs(blogs.filter((blog) => blog.id !== blogId));
      console.log("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog: ", error);
    }
  };

  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}`);
  };

  const handleAddBlogClick = () => {
    navigate("/addNewBlog");
  };

  return (
    <Box sx={{ padding: 3, position: "relative" }}>
      <Typography variant="h4" gutterBottom>
        My Blogs
      </Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card>
              {blog.coverImage && (
                <CardMedia
                  component="img"
                  height="140"
                  image={blog.coverImage}
                  alt="Cover Image"
                />
              )}
              <CardContent>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {blog.content}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(blog.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddBlogClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 20px",
          marginTop: 2,
        }}
      >
        <AddIcon sx={{ marginRight: 1 }} />
        <Typography variant="button">Create New Blog</Typography>
      </Button>
    </Box>
  );
}

export default MyBlogs;
