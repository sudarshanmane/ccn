import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import React, { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useCreateCandidateModal } from "@/hooks/context/useCreateCandidateModel.jsx";
import { usePostCandidate } from "@/hooks/candidates/usePostCandidate.js";
import { DialogDescription } from "@radix-ui/react-dialog";

const CreateCandidateModal = () => {
  const [candidateDetails, setCandidateDetails] = useState({
    name: "",
    email: "",
  });

  const queryClient = useQueryClient();

  const { openCreateCandidateModal, setOpenCreateCandidateModal } =
    useCreateCandidateModal();

  const { isPending, postCandidateMubation } = usePostCandidate();

  const handleClose = () => {
    setOpenCreateCandidateModal(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const data = await postCandidateMubation(candidateDetails);
      queryClient.invalidateQueries({ queryKey: ["getCandidates"] });

      if (data) {
        toast.success(data?.message, {
          description: "Candidate has been created successfully!",
        });
      }
    } catch (error) {
      toast.error("Something Went Wront!", {
        description: "Something Went Wront!",
      });
    } finally {
      setOpenCreateCandidateModal(false);
      setCandidateDetails({ name: "", email: "" });
    }
  };

  return (
    <Dialog open={openCreateCandidateModal} onOpenChange={handleClose}>
      <DialogContent className={"top-52"}>
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
          <DialogDescription>
            Enter the name and email for the new candidate.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitForm} className="flex flex-col gap-3">
          <Input
            required
            minLength={3}
            placeholder="Candidate Name"
            onInput={(e) => {
              setCandidateDetails({
                ...candidateDetails,
                name: e.target.value,
              });
            }}
          ></Input>
          <Input
            placeholder="Candidate Email"
            type={"email"}
            onInput={(e) => {
              setCandidateDetails({
                ...candidateDetails,
                email: e.target.value,
              });
            }}
          ></Input>
          <Button className="w-fit ml-auto" disabled={isPending} type="submit">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCandidateModal;
