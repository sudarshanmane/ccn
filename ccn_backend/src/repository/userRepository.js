import User from "../schema/usrerSchema.js";
import crudRepository from "./crudRepository.js";

const userRepository = {
  ...crudRepository(User),

  getUserByEmail: async function (email) {
    const userDoc = await User.findOne({ email }).select("+password");
    return userDoc;
  },
};

export default userRepository;
