import { pool } from "../db.js";

export const createLike = async (req, res) => {
  try {
    const { user_id } = req;
    const { id } = req.params;

    const newLike = await pool.query(
      "INSERT INTO likes (user_id, blog_id) VALUES ($1, $2) RETURNING *",
      [user_id, id]
    );

    // Agrupar los likes por blog
    await pool.query("UPDATE blogs SET likes = likes + 1 WHERE blog_id = $1", [
      id,
    ]);

    res.json(newLike.rows[0]);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteLike = async (req, res) => {
  try {
    const { user_id } = req;
    const { id } = req.params;

    const deletedLike = await pool.query(
      "DELETE FROM likes WHERE user_id = $1 AND blog_id = $2 RETURNING *",
      [user_id, id]
    );

    // Eliminar los likes por blog
    const likesCount = await pool.query("UPDATE blogs SET likes = likes - 1 WHERE blog_id = $1", [
      id,
    ]);

    if (deletedLike.rowCount === 0)
      return res
        .status(404)
        .json({ status: "error", message: "Like NOT FOUND" });

    res.json({ status: "success", message: "Like deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
