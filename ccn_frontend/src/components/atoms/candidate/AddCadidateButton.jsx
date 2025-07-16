import { Button } from "@/components/ui/button.jsx";
import { useCreateCandidateModal } from "@/hooks/context/useCreateCandidateModel.jsx";
import React from "react";
import { FaPlus } from "react-icons/fa";

const AddCadidateButton = () => {
  const { setOpenCreateCandidateModal } = useCreateCandidateModal();

  const handleOpenModal = () => {
    setOpenCreateCandidateModal(true);
  };

  return (
    <div className="flex justify-end mb-3">
      <Button
        className={"bg-orange-300 text-black hover:text-white"}
        size={"default"}
        onClick={handleOpenModal}
      >
        <FaPlus></FaPlus>
      </Button>
    </div>
  );
};

export default AddCadidateButton;
