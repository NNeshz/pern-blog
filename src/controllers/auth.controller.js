import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/createAccessToken.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    const token = await createAccessToken({ id: response.rows[0].user_id });

    // Descomentar las siguientes líneas para usar cookies:
    res.cookie("token", token, {
      // httpOnly: true,
      // secure: true,
      // sameSite: "none",
      // maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      id: response.rows[0].user_id,
      username: response.rows[0].username,
      email: response.rows[0].email,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación de email:
    const userFound = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userFound.rowCount === 0)
      return res
        .status(401)
        .json({ status: "error", message: "User not found" });

    // Validación de password:
    const validPassword = await bcrypt.compare(
      password,
      userFound.rows[0].password_hash
    );
    if (!validPassword)
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });

    const token = await createAccessToken({ id: userFound.rows[0].user_id });

    // Descomentar las siguientes líneas para usar cookies:
    res.cookie("token", token, {
      // httpOnly: true,
      // secure: true,
      // sameSite: "none",
      // maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      id: userFound.rows[0].user_id,
      username: userFound.rows[0].username,
      email: userFound.rows[0].email,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

export const profile = async (req, res) => {
  try {
    console.log(req.user_id);
    const response = await pool.query(
      "SELECT username, email FROM users WHERE user_id = $1",
      [req.user_id]
    );

    res.json({
      id: req.user_id,
      username: response.rows[0].username,
      email: response.rows[0].email,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
