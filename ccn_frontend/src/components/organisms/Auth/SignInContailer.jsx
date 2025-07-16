import React, { useEffect, useState } from "react";
import SigninCard from "./SignInCard.jsx";
import { useSignin } from "@/hooks/apis/useSignin.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/context/userAuth.js";

const SignInContailer = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState();

  const { data, isSuccess, isPending, error, signInMutation } = useSignin();

  const navigate = useNavigate();

  async function handleSigninSubmitForm(e) {
    e.preventDefault();

    if (!signinForm.email || !signinForm.password) {
      return setValidationError("Email and password is required");
    }

    setValidationError(null);

    await signInMutation({ ...signinForm });
  }

  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (data) {
      toast.success(data?.message, {
        description: "User signed in successfully!",
        style: {
          background: "",
          color: "green",
        },
      });
      setAuth({ user: data.data.user, token: data.data.token });
    }
  }, [data]);

  useEffect(() => {
    if (auth?.user && auth?.token) {
      navigate("/dashboard");
    }
  }, [auth]);

  const handleSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <SigninCard
      signinForm={signinForm}
      setSigninForm={setSigninForm}
      handleSigninSubmitForm={handleSigninSubmitForm}
      validationError={validationError}
      isSuccess={isSuccess}
      isPending={isPending}
      error={error}
      handleSignup={handleSignup}
    ></SigninCard>
  );
};

export default SignInContailer;
