import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { checkAuth } from "../controllers/auth.controller.js";

const router=Router();

router.get("/check", protectRoute, checkAuth)

export default router;