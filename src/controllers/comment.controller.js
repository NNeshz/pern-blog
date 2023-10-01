import { pool } from "../db.js";

export const createComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const { user_id } = req;

    const newComment = await pool.query(
      "INSERT INTO comments (content, user_id, blog_id) VALUES ($1, $2, $3) RETURNING *",
      [content, user_id, id]
    );

    res.json(newComment.rows[0]);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { content } = req.body;
    const { user_id } = req;

    const updatedComment = await pool.query(
      "UPDATE comments SET content = $1 WHERE comment_id = $2 AND user_id = $3 AND blog_id = $4 RETURNING *",
      [content, commentId, user_id, id]
    );

    res.json(updatedComment.rows[0]);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;
    const { user_id } = req;

    const deletedComment = await pool.query(
      "DELETE FROM comments WHERE comment_id = $1 AND user_id = $2 AND blog_id = $3 RETURNING *",
      [commentId, user_id, id]
    );

    if (deletedComment.rowCount === 0)
      return res
        .status(404)
        .json({
          status: "error",
          message: `Comment with id: ${commentId}, NOT FOUND`,
        });

    res.json({ status: "success", message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
