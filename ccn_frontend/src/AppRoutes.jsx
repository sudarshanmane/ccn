import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Auth } from "./pages/auth/Auth.jsx";
import SignInContailer from "./components/organisms/Auth/SignInContailer.jsx";
import SignupContainer from "./components/organisms/Auth/SignupContainer.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ProtectedRoutes from "./components/molecules/protectedRoutes/ProtectedRoutes.jsx";
import CandidateNotes from "./pages/candidateNotes/CandidateNotes.jsx";
import { useAuth } from "./hooks/context/userAuth.js";
import Navbar from "./pages/navbar/Navbar.jsx";

const AppRoutes = () => {
  const { auth } = useAuth();
  return (
    <>
      {auth?.user && auth?.token && (
        <div className="">
          <Navbar></Navbar>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/dashbord"}></Navigate>}
        ></Route>
        <Route
          path="/auth/signin"
          element={
            <Auth>
              <SignInContailer></SignInContailer>
            </Auth>
          }
        ></Route>

        <Route
          path="/auth/signup"
          element={
            <Auth>
              <SignupContainer></SignupContainer>
            </Auth>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard></Dashboard>
            </ProtectedRoutes>
          }
        ></Route>

        <Route
          path="candidate/:id"
          element={
            <ProtectedRoutes>
              <CandidateNotes></CandidateNotes>
            </ProtectedRoutes>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
