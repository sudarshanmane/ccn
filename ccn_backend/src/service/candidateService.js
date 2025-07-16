import candidateRepository from "../repository/candidateRepository.js";

export const getCandidatesService = async () => {
  try {
    const candidates = await candidateRepository.getAll();
    return candidates;
  } catch (error) {
    throw error;
  }
};
