import { pool } from "../db.js";

export const getAllBlogs = async (req, res) => {
  res.send("Get all blogs");
};

export const getBlogById = async (req, res) => {
  res.send("Get blog by id");
};

export const createBlog = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    const blogResponse = await pool.query(
      "INSERT INTO blogs (title, content, user_id) VALUES ($1, $2, $3)",
      [title, content, user_id]
    );

    res.json(blogResponse.rows[0]);
  } catch (error) {
    console.log(error)
  }
};

export const updateBlog = async (req, res) => {
  res.send("Update blog");
};

export const deleteBlog = async (req, res) => {
  res.send("Delete blog");
};
