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
import { LucideLoader2, TriangleAlert } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router";

const SignupCard = ({
  onSignUpFormSubmit,
  signupForm,
  setSignupForm,
  validationError,
  isPending,
  isSuccess,
  error,
  handleSigninCard
}) => {
  return (
    <Card className={"bg-white "}>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Sign up to access your account!</CardDescription>
        {validationError && (
          <div className="bg-red-800/10 mt-3 p-4 text-red-700 text-sm rounded-sm">
            {validationError}
          </div>
        )}

        {error && (
          <div className="bg-red-800/10 mt-3 p-4 text-red-300 text-sm rounded-sm flex gap-3">
            <TriangleAlert className="size-5"></TriangleAlert>
            {error?.err
              ? error.err[0]
              : error?.message || "Something Went Wron"}
          </div>
        )}

        {isSuccess && (
          <div className="bg-green-800/10 mt-3 p-4 gap-2 f text-green-700 text-sm rounded-sm flex flex-col text-center">
            {isSuccess}
            <div className="flex gap-3">
              <FaCheck className="size-5"></FaCheck>
              Successfully signed up!
            </div>
            <div className="flex gap-3">
              <LucideLoader2 className="animate-spin"></LucideLoader2>
              <p>You will be redired to the login page soon!</p>{" "}
            </div>{" "}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={onSignUpFormSubmit} className="space-y-3">
          <Input
            placeholder="Username"
            onInput={(e) => {
              setSignupForm({ ...signupForm, username: e.target.value });
            }}
            default={signupForm.username}
            type="text"
            disabled={isPending}
          ></Input>

          <Input
            placeholder="Email"
            onInput={(e) => {
              setSignupForm({ ...signupForm, email: e.target.value });
            }}
            default={signupForm.email}
            disabled={isPending}
          ></Input>

          <Input
            placeholder="Password"
            onInput={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
            default={signupForm.password}
            disabled={isPending}
            type="text"
          ></Input>

          <Input
            placeholder="Confirm Password"
            onInput={(e) =>
              setSignupForm({ ...signupForm, confirmPassword: e.target.value })
            }
            default={signupForm.confirmPassword}
            disabled={isPending}
            type="text"
          ></Input>

          <Button
            size={"lg"}
            type="submit"
            className="w-full bg-black text-white text-sm"
            disabled={isPending}
            loading={isPending}
          >
            Continue
          </Button>
        </form>
        <Separator className="bg-black my-5"></Separator>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={handleSigninCard}
          >
            {" "}
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignupCard;
