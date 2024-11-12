import {
  Box,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/blogSlice";
import { Link } from "react-router-dom";

function PostList({ posts }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 3 }}>
      <Stack spacing={2}>
        {posts.map((post) => (
          <Card key={post.id} sx={{ display: "flex", flexDirection: "row" }}>
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120 }}
              image={post.coverImage}
              alt={post.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2" color="textSecondary" noWrap>
                {post.content.substring(0, 100)}...
              </Typography>
              <Stack direction="row" spacing={2} sx={{ marginTop: 1 }}>
                <Button
                  variant="outlined"
                  component={Link}
                  to={`/edit/${post.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

export default PostList;
