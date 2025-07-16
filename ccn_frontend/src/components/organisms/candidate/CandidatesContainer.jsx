import { useGetCandidates } from "@/hooks/candidates/useGetCandidates.js";
import React, { useEffect, useState } from "react";
import CandidateList from "./CandidateList.jsx";

const CandidatesContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, isFetching, error, data } = useGetCandidates({
    limit: 5,
    page: currentPage,
  });

  const handlePageChange = (page) => {
    if ((page >= 1 && page <= data?.data?.pagination?.totalPages) || 0) {
      setCurrentPage(page);
    }
  };

  const formatTimestamp = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  useEffect(() => {
    if (data) {
      console.log("Fetched candidates:", data);
    }
  }, [data]);

  return (
    <CandidateList
      loading={isPending}
      candidates={data?.data?.docs || []}
      pagination={data?.data?.pagination || {}}
      currentPage={currentPage}
      formatTimestamp={formatTimestamp}
      handlePageChange={handlePageChange}
    ></CandidateList>
  );
};

export default CandidatesContainer;
