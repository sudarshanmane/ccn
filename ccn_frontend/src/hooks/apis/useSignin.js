import { singInRequest } from "@/api/auth/index.js";
import { useMutation } from "@tanstack/react-query";

export const useSignin = () => {
  const {
    data,
    isSuccess,
    error,
    isPending,
    mutateAsync: signInMutation,
  } = useMutation({
    mutationFn: singInRequest,
    onSuccess: (data) => {
      localStorage.setItem("auth", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      console.log("Signed in successfully!", data);
    },
    onError: (error) => {
      console.error("Error while signin", error);
    },
  });

  return {
    data,
    isSuccess,
    error,
    isPending,
    signInMutation,
  };
};
