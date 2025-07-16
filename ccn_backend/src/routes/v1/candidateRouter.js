import express from "express";

import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { validate } from "../../validators/zodValidator.js";
import {
  getCandidatesController,
  postCandidateController,
} from "../../controller/candidateController.js";
import { candidateSchema } from "../../validators/candidateSchema.js";

const candidateRouter = express.Router();

candidateRouter.get("/", isAuthenticated, getCandidatesController);
candidateRouter.post(
  "/",
  isAuthenticated,
  validate(candidateSchema),
  postCandidateController
);

export default candidateRouter;
