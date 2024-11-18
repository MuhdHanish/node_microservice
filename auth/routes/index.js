import { Router } from "express";
import AuthRoutes from "./auth.route.js"
import UserRoutes from "./user.route.js"

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

export default router;