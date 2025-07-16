import { StatusCodes } from "http-status-codes";
import ClientError from "../utils/errors/clientError.js";
import { signUpService, userLoginService } from "../service/userService.js";
import {
  customErrorResponse,
  internalServerErrorResponse,
  successReponse,
} from "../utils/common/customObjects.js";

export const userSignupController = async (req, res, next) => {
  try {
    const response = await signUpService(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json(successReponse(response, "User Created Successfully!"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const userLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ClientError({
        explanation: ["Email and Password not sent by client!"],
        message: "Email and password is required!",
        StatusCode: StatusCodes.BAD_REQUEST,
      });
    }

    const response = await userLoginService(email, password);

    return res.status(200).json({
      success: true,
      message: "Loggedin successfully!",
      data: response,
    });
  } catch (error) {
    if (error.StatusCodes) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(customErrorResponse(error));
  }
};
