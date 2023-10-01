import { Router } from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller";

const router = Router();

router.get("/blogs", getAllBlogs);

router.get("/blogs/:id", getBlogById);

router.post("/blogs", createBlog);

router.put("/blogs/:id", updateBlog);

router.delete("/blogs/:id", deleteBlog);

export default router;
