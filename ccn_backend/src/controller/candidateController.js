import { StatusCodes } from "http-status-codes";
import {
  customErrorResponse,
  internalServerErrorResponse,
  successReponse,
} from "../utils/common/customObjects.js";
import {
  getCandidatesService,
  postCandidateService,
} from "../service/candidateService.js";

export const getCandidatesController = async (req, res, next) => {
  try {
    const response = await getCandidatesService(req);

    return res
      .status(StatusCodes.CREATED)
      .json(successReponse(response, "Candidates Fetched Successfully!"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};

export const postCandidateController = async (req, res, next) => {
  try {
    const response = await postCandidateService(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json(successReponse(response, "Candidate Created Successfully!"));
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalServerErrorResponse(error));
  }
};
