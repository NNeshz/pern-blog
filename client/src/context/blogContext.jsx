/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios.js";

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [errors, setErrors] = useState(null);

  const loadBlogs = async () => {
    try {
      const res = await axios.get("/blogs");
      setBlogs(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const loadBlog = async (id) => {
    try {
      const res = await axios.get(`/blogs/${id}`);
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const createBlog = async (data) => {
    try {
      const res = await axios.post("/create-blog", data);
      setBlogs([...blogs, res.data]);
      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await axios.delete(`/blogs/${id}`);
      if (res.status === 200) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const updateBlog = async (id, data) => {
    try {
      const res = await axios.put(`/blogs/${id}`, data);
      if (res.status === 200) {
        setBlogs(blogs.map((blog) => (blog.id === id ? res.data : blog)));
      }
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    const clean = setTimeout(() => {
      setErrors(null);
    }, 5000);

    return () => clearTimeout(clean);
  }, [errors]);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        errors,
        loadBlogs,
        loadBlog,
        createBlog,
        deleteBlog,
        updateBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
