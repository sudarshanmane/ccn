import { StatusCodes } from "http-status-codes";
import { generateJwtToken } from "../middlewares/authMiddleware.js";
import userRepository from "../repository/userRepository.js";
import ClientError from "../utils/errors/clientError.js";
import ValidationError from "../utils/errors/validationError.js";

export const signUpService = async (userObject) => {
  try {
    const response = await userRepository.create(userObject);

    const token = generateJwtToken({
      id: response._id,
      username: response.username,
      password: response.password,
      email: response.email,
    });

    return {
      response,
      token,
    };
  } catch (error) {
    if (error.name === "ValidationError") {
      throw new ValidationError({ error: error.errors }, error.message);
    } else if (error.name === "MongooseError") {
      throw new ValidationError(
        { error: ["A user with the same email or username alread exists!"] },
        "A user with the same email or username alread exists!"
      );
    }

    throw error;
  }
};

export const userLoginService = async (email, password) => {
  try {
    const userExists = await userRepository.getUserByEmail(email);

    if (!userExists) {
      throw new ClientError({
        explanation: ["Invalid Details"],
        message: "No Registered User found with this email",
        StatusCode: StatusCodes.NOT_FOUND,
      });
    }

    const checkPassword = await userExists.comparePassword(password);

    if (!checkPassword) {
      throw new ClientError({
        explanation: ["Invalid Data sent from the client"],
        message: "Invalid Password!",
        statusCode: StatusCodes.BAD_REQUEST,
      });
    } else {
      const token = generateJwtToken({
        id: userExists._id,
        email: userExists.email,
        password: userExists.password,
        username: userExists.username,
      });

      return { user: userExists, token };
    }
  } catch (error) {
    throw error;
  }
};

export const getUserService = async (req) => {
  try {
    const users = await userRepository.getAll();
    return users;
  } catch (error) {
    console.error("Error fetching usrs:", error);
    throw error;
  }
};
