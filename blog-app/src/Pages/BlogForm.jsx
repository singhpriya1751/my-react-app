import { useState } from "react";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/blogSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);

function BlogForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      content: description,
      coverImage,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "blogs"), newPost);
      console.log("Blog post added successfully!");
      dispatch(addPost(newPost));

      setTitle("");
      setDescription("");
      setCoverImage("");

      navigate("/my-blogs");
    } catch (error) {
      console.error("Error adding blog post: ", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h5">Create New Blog Post</Typography>
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
          <ReactQuill
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Write your blog content here"
            style={{ minHeight: 200 }}
          />
          <Button variant="outlined" component="label" sx={{ marginBottom: 2 }}>
            Upload Cover Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover Preview"
              style={{ width: "100%", height: "auto" }}
            />
          )}
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default BlogForm;
