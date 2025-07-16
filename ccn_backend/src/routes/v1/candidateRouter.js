import express from "express";

import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { validate } from "../../validators/zodValidator.js";
import { getCandidatesController } from "../../controller/candidateController.js";

const candidateRouter = express.Router();

candidateRouter.get("/", isAuthenticated, getCandidatesController);
// candidateRouter.post("/signin", validate(signinSchema), userLoginController);

export default candidateRouter;
