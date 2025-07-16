import express from "express";
import userRouter from "./userRouter.js";
import candidateRouter from "./candidateRouter.js";
import notesRouter from "./notesRouter.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import noticationRouter from "./notificationRoutes.js";

const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/candidates", candidateRouter);
v1Router.use("/notes", notesRouter); // Assuming notes are handled in candidateRouter
v1Router.use("/notifications", isAuthenticated, noticationRouter);

export default v1Router;
