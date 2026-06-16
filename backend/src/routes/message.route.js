import { Router } from "express";
import { getChatsForSidebar, getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router=Router();

router.use(protectRoute);

router.get("/users", getUsersForSidebar)
router.get("/chats", getChatsForSidebar)
router.get("/:id", getMessages)
router.post("/send/:id", upload.single("media"), sendMessage)
export default router;