import { Router } from "express";
import { getChatsForSidebar, getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router=Router();

router.use(protectRoute);

router.get("/users", getUsersForSidebar)
router.get("/chats", getChatsForSidebar)
router.get("/:id", getMessages)
                        //   todo: show this ("media") in the frontend
router.get("/sender/:id", upload.single("media"), sendMessage)
export default router;