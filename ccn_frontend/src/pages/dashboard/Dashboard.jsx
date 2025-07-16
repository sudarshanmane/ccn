import AddCadidateButton from "@/components/atoms/candidate/AddCadidateButton.jsx";
import { DashboardNotifications } from "@/components/molecules/notifications/DashboardNotification.jsx";
import CandidatesContainer from "@/components/organisms/candidate/CandidatesContainer.jsx";
import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col px-10">
      <DashboardNotifications></DashboardNotifications>
      <AddCadidateButton></AddCadidateButton>
      <CandidatesContainer></CandidatesContainer>
    </div>
  );
};

export default Dashboard;
