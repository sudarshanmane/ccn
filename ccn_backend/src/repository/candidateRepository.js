import Candidate from "../schema/candidateSchema.js";
import crudRepository from "./crudRepository.js";

const candidateRepository = {
  ...crudRepository(Candidate),
};

export default candidateRepository;
