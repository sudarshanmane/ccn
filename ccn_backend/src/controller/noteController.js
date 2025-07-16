import { StatusCodes } from "http-status-codes";
import {
  customErrorResponse,
  internalServerErrorResponse,
  successReponse,
} from "../utils/common/customObjects.js";
import {
  getNotesService,
  postNotesService,
} from "../service/getNotesService.js";

export const getNotesController = async (req, res, next) => {
  try {
    const response = await getNotesService(req);

    return res
      .status(StatusCodes.CREATED)
      .json(successReponse(response, "Notes Fetched Successfully!"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const postNotesController = async (req, res, next) => {
  try {
    const response = await postNotesService(req?.user?.username, req.body);

    return res
      .status(StatusCodes.CREATED)
      .json(successReponse(response, "Note Created Successfully!"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
