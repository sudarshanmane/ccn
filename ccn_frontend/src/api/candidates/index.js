import axiosConfig from "@/config/axiosConfig.js";

export const getCandidateRequest = async ({ token, page, limit }) => {
  try {
    const response = await axiosConfig.get("/candidates", {
      headers: { "x-access-token": token },
      params: { page, limit },
    });

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error?.response?.data;
  }
};

export const postCandidateRequest = async ({ token, name, email }) => {
  try {
    console.log("token", token, "name", name, "email", email);
    const response = await axiosConfig.post(
      "/candidates",
      { name, email },
      {
        headers: { "x-access-token": token },
      }
    );

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error?.response?.data;
  }
};
