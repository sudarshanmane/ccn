import { getCandidateRequest } from "@/api/candidates/index.js";
import { useAuth } from "../context/userAuth.js";
import { useQuery } from "@tanstack/react-query";

export const useGetCandidates = () => {
  const { auth } = useAuth();

  const { data, isFetching, isPending, error, } = useQuery({
    queryFn: () =>
      getCandidateRequest({
        token: auth.token,
      }),
    queryKey: [`getCandidates`],
    staleTime: 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    data,
    isFetching,
    isPending,
    error,
  };
};
