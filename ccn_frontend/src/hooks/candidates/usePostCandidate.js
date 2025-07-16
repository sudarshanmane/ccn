import { postCandidateRequest } from "@/api/candidates/index.js";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/userAuth.js";

export const usePostCandidate = () => {
  const { auth } = useAuth();

  const {
    data,
    isSuccess,
    error,
    isPending,
    mutateAsync: postCandidateMubation,
  } = useMutation({
    mutationFn: (data) => {
      return postCandidateRequest({
        token: auth.token,
        name: data.name,
        email: data.email,
      });
    },
    onSuccess: (data) => {
      console.log("Candidate Created successfully!", data);
    },
    onError: (error) => {
      console.error("Error while Creating candidate", error);
    },
  });

  return {
    data,
    isSuccess,
    error,
    isPending,
    postCandidateMubation,
  };
};
