import { createContext, useState } from "react";

const CreateCandidateContext = createContext();

export const CreateCandidateContextProvider = ({ children }) => {
  const [openCreateCandidateModal, setOpenCreateCandidateModal] =
    useState(false);

  return (
    <CreateCandidateContext.Provider
      value={{ openCreateCandidateModal, setOpenCreateCandidateModal }}
    >
      {children}
    </CreateCandidateContext.Provider>
  );
};

export default CreateCandidateContext;
