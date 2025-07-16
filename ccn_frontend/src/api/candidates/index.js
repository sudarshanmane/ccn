import axiosConfig from "@/config/axiosConfig.js";

export const getCandidateRequest = async ({ token }) => {
  try {
    const response = await axiosConfig.get("/candidates", {
      headers: { "x-access-token": token },
    });

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error?.response?.data;
  }
};
