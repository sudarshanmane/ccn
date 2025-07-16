import {
  getUserNotifications,
  markNotificationRead,
} from "../../controller/NotificationController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import express from "express";

const noticationRouter = express.Router();

noticationRouter.get("/", isAuthenticated, getUserNotifications);
noticationRouter.patch("/:id/read", isAuthenticated, markNotificationRead);

export default noticationRouter;
