import CreateCandidateContext from "@/context/CreateCandidateContext.jsx";
import { useContext } from "react";

export const useCreateCandidateModal = () => {
  return useContext(CreateCandidateContext);
};
