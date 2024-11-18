import { Router } from "express";
import UserController from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get(`/:id`, authMiddleware, UserController.getUserById);
router.get(`/ids`, authMiddleware, UserController.getUsersByIds);

export default router;