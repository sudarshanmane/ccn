import { StatusCodes } from "http-status-codes";

import { customErrorResponse } from "../utils/common/customObjects.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      const explanations = [];

      if (
        error.errors &&
        Array.isArray(error.errors) &&
        error.errors.length > 0
      ) {
        error.errors.forEach((el) => {
          explanations.push(el.message);
        });
      } else if (error.message) {
        explanations.push(error.message);
      } else {
        explanations.push("An unknown validation error occurred.");
      }

      res.status(StatusCodes.BAD_REQUEST).json(
        customErrorResponse({
          message: "ValidationError",
          explanations: explanations,
        })
      );
    }
  };
};
