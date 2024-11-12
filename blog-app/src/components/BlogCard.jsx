import { Typography, Stack, Card, CardContent, CardMedia } from "@mui/material";

const BlogCard = ({ post }) => {
  const description = post.description || "";

  return (
    <Card
      sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, overflow: "hidden" }}
    >
      <CardMedia
        component="img"
        height="200"
        image={post.coverImage}
        alt={post.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold" }}>
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.content}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
