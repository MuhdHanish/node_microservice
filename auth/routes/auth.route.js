import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(`/auth/register`, AuthController.register);
router.post(`/auth/login`, AuthController.login);

// Private Route
router.get(`/auth/user`, authMiddleware, AuthController.user);

export default router;