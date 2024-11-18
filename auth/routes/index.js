import { Router } from "express";
import AuthRoutes from "./auth.route.js"

const router = Router();

router.use("/api", AuthRoutes);

export default router;