import { Router } from "express";
import postController from '../controllers/postController';

const router = Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.get("/user/:userName", postController.getPostsByUser);
router.post("/", postController.addPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;