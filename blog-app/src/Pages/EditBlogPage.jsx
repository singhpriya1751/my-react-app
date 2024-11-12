import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "../../firebase"; 


const db = getFirestore(app);

function EditBlogPage() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      const blogDoc = await getDoc(doc(db, "blogs", id));
      if (blogDoc.exists()) {
        const blogData = blogDoc.data();
        setTitle(blogData.title);
        setContent(blogData.content);
        setCoverImage(blogData.coverImage);
      } else {
        console.log("No such blog!");
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await updateDoc(doc(db, "blogs", id), {
        title,
        content,
        coverImage,
      });
      console.log("Blog updated successfully!");
      navigate("/my-blogs");
    } catch (error) {
      console.error("Error updating blog: ", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5">Edit Blog Post</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Blog Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Blog Content"
            variant="outlined"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
          />
          <TextField
            label="Cover Image URL"
            variant="outlined"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Update Post
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default EditBlogPage;
