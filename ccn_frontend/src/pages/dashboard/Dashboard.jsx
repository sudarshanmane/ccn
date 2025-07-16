import AddCadidateButton from "@/components/atoms/candidate/AddCadidateButton.jsx";
import CandidatesContainer from "@/components/organisms/candidate/CandidatesContainer.jsx";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col px-10">
      <AddCadidateButton></AddCadidateButton>
      <CandidatesContainer></CandidatesContainer>
    </div>
  );
};

export default Dashboard;
