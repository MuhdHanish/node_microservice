import { Router } from "express";
import UserController from "../controller/user.controller.js";

const router = Router();

router.get(`/:id`, UserController.getUserById);
router.post(`/users-by-ids`, UserController.getUsersByIds);

export default router;