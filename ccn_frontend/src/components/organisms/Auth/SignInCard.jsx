import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import React from "react";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

const SigninCard = ({
  setSigninForm,
  signinForm,
  handleSigninSubmitForm,
  validationError,
  error,
  isPending,
  isSuccess,
  handleSignup,
}) => {
  return (
    <Card className={"bg-white "}>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign In to access your account!</CardDescription>
      </CardHeader>
      <CardContent>
        {validationError && (
          <div className="p-4 bg-red-600/10 text-red-500 text-sm rounded-sm mb-3">
            {" "}
            {validationError}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-600/10 text-red-500 text-sm rounded-sm mb-3">
            {" "}
            {error?.err || error?.message || "Something went wrong!"}
          </div>
        )}

        {isSuccess && (
          <div className="p-4 bg-green-600/10 text-green-500 text-sm rounded-sm mb-3 flex gap-3 items-center ">
            <FaCheck></FaCheck> <p> You have been signed in successfully!</p>
          </div>
        )}

        {validationError && (
          <div className="p-4 bg-red-600/10 text-red-500 text-sm rounded-sm mb-3">
            {" "}
            {validationError}
          </div>
        )}

        <form onSubmit={handleSigninSubmitForm} className="space-y-3">
          <Input
            placeholder="Email"
            required
            onInput={(e) =>
              setSigninForm({ ...signinForm, email: e.target.value })
            }
            default={signinForm.email}
            type="email"
          ></Input>

          <Input
            placeholder="Password"
            required
            onInput={(e) =>
              setSigninForm({ ...signinForm, password: e.target.value })
            }
            default={signinForm.password}
            type="text"
          ></Input>

          <Button
            size={"lg"}
            type="submit"
            className="w-full bg-black text-white text-sm"
          >
            Continue
          </Button>
        </form>
        <Separator className="bg-black my-5"></Separator>
        <p className="text-sm mt-4 text-center">
          Dont have an account?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={handleSignup}
          >
            {" "}
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SigninCard;
