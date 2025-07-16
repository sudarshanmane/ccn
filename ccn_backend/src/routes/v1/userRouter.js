import express from "express";

import { isAuthenticated } from "../../middlewares/authMiddleware.js";
import { signinSchema } from "../../validators/signinSchema.js";
import { userSignUpSchema } from "../../validators/userSchema.js";
import { validate } from "../../validators/zodValidator.js";
import {
  getUserController,
  userLoginController,
  userSignupController,
} from "../../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", validate(userSignUpSchema), userSignupController);
userRouter.post("/signin", validate(signinSchema), userLoginController);
userRouter.route("/").get(isAuthenticated, getUserController);

export default userRouter;
