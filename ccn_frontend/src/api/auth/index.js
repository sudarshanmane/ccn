import axiosConfig from "@/config/axiosConfig.js";

export const signUpRequest = async ({ email, password, username }) => {
  try {
    const response = await axiosConfig.post("/users/signup", {
      email,
      password,
      username,
    });

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error?.response?.data;
  }
};

export const singInRequest = async ({ email, password }) => {
  try {
    const response = await axiosConfig.post("/users/signin", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error?.response?.data;
  }
};
