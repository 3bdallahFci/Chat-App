import express from "express";
import { protectMiddleware } from "../middlewares/protectMiddleware.js";
import { getUserForSidebar,getMessages,sendMessage } from "../controllers/message.controller.js";


const router = express.Router();

// Define your message routes here
router.get("/user",protectMiddleware,getUserForSidebar);
router.get("/:id",protectMiddleware,getMessages);
router.post("/send/:id",protectMiddleware,sendMessage);
export default router;