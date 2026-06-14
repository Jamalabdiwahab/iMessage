import { Router } from "express";

const router=Router();

router.get("/check", protectRoute, checkAuth)

export default router;