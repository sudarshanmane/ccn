import { useAuth } from "@/hooks/context/userAuth.js";
import React from "react";
import { Navigate } from "react-router-dom";
import { LucideLoader2 } from "lucide-react";

const ProtectedRoutes = ({ children }) => {
  const { auth } = useAuth();

  if (auth.isLoading) {
    return (
      <div className=" flex h-[100vh] justify-center items-center">
        <LucideLoader2 className="animate-spin  ml-2"></LucideLoader2>
      </div>
    );
  }

  if (!auth.user && !auth.token) {
    return <Navigate to="/auth/signin"></Navigate>;
  }

  return children;
};

export default ProtectedRoutes;
