import express from "express";

import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import {
  getNotesController,
  postNotesController,
} from "../../controller/noteController.js";

const notesRouter = express.Router();

notesRouter.get("/:candidateId", isAuthenticated, getNotesController);
notesRouter.post("/", isAuthenticated, postNotesController);

export default notesRouter;
