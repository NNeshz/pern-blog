import { pool } from "../db.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogResponse = await pool.query(
      "SELECT b.*, c.comment_id, c.content AS comment_content, c.created_at AS comment_created_at " +
        "FROM blogs b " +
        "LEFT JOIN comments c ON b.blog_id = c.blog_id " +
        "WHERE b.user_id = $1",
      [req.user_id]
    );

    if (blogResponse.rowCount === 0)
      return res
        .status(200)
        .json({ status: "success", message: "No blogs found" });

    // Agrupar los comentarios por blog_id
    const blogsWithComments = blogResponse.rows.reduce((acc, blog) => {
      const {
        blog_id,
        title,
        content,
        category,
        created_at,
        updated_at,
        likes,
      } = blog;
      if (!acc[blog_id]) {
        acc[blog_id] = {
          blog_id,
          title,
          content,
          category,
          created_at,
          updated_at,
          likes,
          comments: [],
        };
      }
      if (blog.comment_id) {
        acc[blog_id].comments.push({
          comment_id: blog.comment_id,
          content: blog.comment_content,
          created_at: blog.comment_created_at,
        });
      }
      return acc;
    }, {});

    const result = Object.values(blogsWithComments);

    res.json(result);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { user_id } = req;
    const { id } = req.params;

    const blogResponse = await pool.query(
      "SELECT b.*, c.comment_id, c.content AS comment_content, c.created_at AS comment_created_at " +
        "FROM blogs b " +
        "LEFT JOIN comments c ON b.blog_id = c.blog_id " +
        "WHERE b.blog_id = $1 AND b.user_id = $2",
      [id, user_id]
    );

    if (blogResponse.rowCount === 0)
      return res
        .status(404)
        .json({ status: "error", message: `Blog with id: ${id}, NOT FOUND` });

    // Agrupar los comentarios por blog_id
    const blogsWithComments = blogResponse.rows.reduce((acc, blog) => {
      const {
        blog_id,
        title,
        content,
        category,
        created_at,
        updated_at,
        likes,
      } = blog;
      if (!acc[blog_id]) {
        acc[blog_id] = {
          blog_id,
          title,
          content,
          category,
          created_at,
          updated_at,
          likes,
          comments: [],
        };
      }
      if (blog.comment_id) {
        acc[blog_id].comments.push({
          comment_id: blog.comment_id,
          content: blog.comment_content,
          created_at: blog.comment_created_at,
        });
      }
      return acc;
    }, {});

    const result = Object.values(blogsWithComments);

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { user_id } = req;
    const { title, content, category } = req.body;

    const blogResponse = await pool.query(
      "INSERT INTO blogs (title, content, category, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, category, user_id]
    );

    res.json(blogResponse.rows[0]);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { user_id } = req;
    const { id } = req.params;
    const { title, content, category } = req.body;

    const blogResponse = await pool.query(
      "UPDATE blogs SET title = $1, content = $2, category = $3 WHERE blog_id = $4 AND user_id = $5 RETURNING *",
      [title, content, category, id, user_id]
    );

    if (blogResponse.rowCount === 0)
      return res
        .status(404)
        .json({ status: "error", message: `Blog with id: ${id}, NOT FOUND` });

    res.json(blogResponse.rows[0]);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { user_id } = req;
    const { id } = req.params;

    const blogResponse = await pool.query(
      "DELETE FROM blogs WHERE blog_id = $1 AND user_id = $2 RETURNING *",
      [id, user_id]
    );

    if (blogResponse.rowCount === 0)
      return res
        .status(404)
        .json({ status: "error", message: `Blog with id: ${id}, NOT FOUND` });

    res.json({ status: "success", message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
