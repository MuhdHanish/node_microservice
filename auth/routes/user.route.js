import { Router } from "express";
import UserController from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get(`/:id`, UserController.getUserById);
router.get(`/ids`, UserController.getUsersByIds);

export default router;