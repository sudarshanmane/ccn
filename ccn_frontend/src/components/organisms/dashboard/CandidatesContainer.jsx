import { useGetCandidates } from "@/hooks/candidates/useGetCandidates.js";
import React, { useEffect } from "react";

const CandidatesContainer = () => {
  const { isPending, isFetching, error, data } = useGetCandidates();

  useEffect(() => {
    if (data) {
      console.log("Fetched candidates:", data);
    }
  }, [data]);

  return <div>CandidatesContainer</div>;
};

export default CandidatesContainer;
