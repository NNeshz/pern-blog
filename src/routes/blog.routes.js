import { Router } from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { validateSchema } from '../middleware/validateMiddleware.js'
import { blogSchema } from '../schemas/blog.schema.js'

const router = Router();

router.get("/blogs", isAuth,  getAllBlogs);

router.get("/blogs/:id", isAuth, getBlogById);

router.post("/create-blog", isAuth, validateSchema(blogSchema), createBlog);

router.put("/blogs/:id", isAuth, validateSchema(blogSchema), updateBlog);

router.delete("/blogs/:id", isAuth, deleteBlog);

export default router;
