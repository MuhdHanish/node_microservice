import { Router } from "express";
import AuthController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(`/register`, AuthController.register);
router.post(`/login`, AuthController.login);

// Private Route
router.get(`/user`, authMiddleware, AuthController.user);

export default router;