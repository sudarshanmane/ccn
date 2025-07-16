import { getCandidateRequest } from "@/api/candidates/index.js";
import { useAuth } from "../context/userAuth.js";
import { useQuery } from "@tanstack/react-query";

export const useGetCandidates = ({ page = 1, limit = 5 }) => {
  const { auth } = useAuth();

  const { data, isFetching, isPending, error } = useQuery({
    queryFn: () =>
      getCandidateRequest({
        token: auth.token,
        page,
        limit,
      }),
    queryKey: [`getCandidates`, page, limit],
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
