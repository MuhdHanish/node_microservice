import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js"
import PostController from "../controller/post.controller.js";

const router = Router();

router.post("/", authMiddleware, PostController.create);
router.get("/", authMiddleware, PostController.posts);

export default router;