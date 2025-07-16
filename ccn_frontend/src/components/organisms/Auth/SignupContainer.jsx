// we write all the buisness logic or the stat related stuff here

import React, { useEffect, useState } from "react";
import SignupCard from "./SignupCard.jsx";
import { useSignup } from "@/hooks/apis/useSignup.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/context/userAuth.js";

const SignupContainer = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [validationError, setValidationError] = useState(false);
  const navigate = useNavigate();

  const { data, isPending, isSuccess, error, signupMutation } = useSignup();
  const { auth } = useAuth();

  async function onSignUpFormSubmit(e) {
    e.preventDefault();

    if (!signupForm.email) {
      return setValidationError("Email is required!");
    }

    setValidationError(false);

    if (signupForm.password !== signupForm.confirmPassword) {
      return setValidationError("Password and confirm password must match!");
    }

    await signupMutation({
      email: signupForm.email,
      password: signupForm.password,
      username: signupForm.username,
    });
  }

  useEffect(() => {
    toast.success(data?.message, {
      description: "Your account has been created successfully!",
    });
    if (isSuccess) {
      setTimeout(() => {
        navigate("/auth/signin");
      }, 3000);
    }
  }, [isSuccess, navigate, data?.message]);

  const handleSigninCard = () => {
    navigate("/auth/signin");
  };

  useEffect(() => {
    if (auth?.user && auth?.token) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <SignupCard
      isPending={isPending}
      isSuccess={isSuccess}
      error={error}
      signupMutation={signupMutation}
      signupForm={signupForm}
      validationError={validationError}
      onSignUpFormSubmit={onSignUpFormSubmit}
      setSignupForm={setSignupForm}
      handleSigninCard={handleSigninCard}
    ></SignupCard>
  );
};

export default SignupContainer;
