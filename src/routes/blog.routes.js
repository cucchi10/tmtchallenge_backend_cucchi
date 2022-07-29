import { Router } from "express";
import blogController from './../controllers/blogController';

const router = Router();

router.get("/", blogController.getBlogs);
router.get("/:id", blogController.getBlog);
router.get("/user/:userName", blogController.getBlogsByUser);
router.post("/", blogController.addBlog);
router.put("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

export default router;