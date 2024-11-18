import { Router } from "express";
import PostRoutes from "./post.route.js";

const router = Router();

router.use("/post", PostRoutes);

export default router;