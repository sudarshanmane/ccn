import { signUpRequest } from "@/api/auth/index.js";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  const {
    data,
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      console.log("Successfully signed up", data);
    },
    onError: (error) => {
      console.error("Failed to signup", error);
    },
  });

  return { data, isPending, isSuccess, error, signupMutation };
};
