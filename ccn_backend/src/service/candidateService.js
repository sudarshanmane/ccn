import candidateRepository from "../repository/candidateRepository.js";

export const getCandidatesService = async (req) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const candidates = await candidateRepository.getAllPaginated(limit, page);
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates:", error);
    throw error;
  }
};

export const postCandidateService = async (candidateData) => {
  try {
    const newCandidate = await candidateRepository.create(candidateData);
    return newCandidate;
  } catch (error) {
    throw error;
  }
};
