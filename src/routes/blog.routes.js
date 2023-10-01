import { Router } from "express";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { createComment, updateComment, deleteComment } from '../controllers/comment.controller.js'
import { createLike, deleteLike } from '../controllers/like.controller.js'

import { isAuth } from "../middleware/isAuth.js";

// Schemas from Zod and validator
import { validateSchema } from '../middleware/validateMiddleware.js'
import { blogSchema } from '../schemas/blog.schema.js'
import { commentSchema } from "../schemas/comment.schema.js";

const router = Router();

// Blog Routes

router.get("/blogs", isAuth,  getAllBlogs);

router.get("/blogs/:id", isAuth, getBlogById);

router.post("/create-blog", isAuth, validateSchema(blogSchema), createBlog);

router.put("/blogs/:id", isAuth, validateSchema(blogSchema), updateBlog);

router.delete("/blogs/:id", isAuth, deleteBlog);

// Comments Routes

router.post("/blogs/:id/comments", isAuth, validateSchema(commentSchema), createComment);

router.put("/blogs/:id/comments/:commentId", isAuth, validateSchema(commentSchema), updateComment);

router.delete("/blogs/:id/comments/:commentId", isAuth, deleteComment);

// Likes Routes

router.post("/blogs/:id/like", isAuth, createLike);

router.delete("/blogs/:id/like", isAuth, deleteLike);

export default router;
