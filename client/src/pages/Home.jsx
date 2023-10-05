/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "../components/ui";
import BlogForm from "../components/BlogForm/BlogForm.jsx";
import { useBlog } from "../context/blogContext";

import { useEffect } from "react";

function Home() {
  const { blogs, loadBlogs } = useBlog();

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <Container>
      <BlogForm />
      {blogs.length === 0 ? (
        <h1>No blogs found</h1>
      ) : (
        blogs.map((blog, i) => (
          <div key={i}>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </Container>
  );
}

export default Home;
