import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import BlogPage from "./Pages/BlogPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BlogForm from "./Pages/BlogForm";
import MyBlogs from "./Pages/MyBlogs";
import EditBlogPage from "./Pages/EditBlogPage";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/addNewBlog" element={<BlogForm />} />
        <Route path="/edit/:id" element={<BlogForm />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/edit-blog/:id" element={<EditBlogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
