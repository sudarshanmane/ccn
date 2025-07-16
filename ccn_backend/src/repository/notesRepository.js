import Notes from "../schema/notesSchema.js";
import crudRepository from "./crudRepository.js";

const noteRepository = {
  ...crudRepository(Notes),
};

export default noteRepository;
