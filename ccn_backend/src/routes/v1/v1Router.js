import express from "express";
import userRouter from "./userRouter.js";
import candidateRouter from "./candidateRouter.js";

const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/candidates", candidateRouter);

export default v1Router;
