import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SinginSchema from "../Schema/Singin";
import { SinginTypes } from "../types";
import { useSinginhook } from "../hooks/customhooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Button, CircularProgress } from "@mui/material";

const Singin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SinginTypes>({
    resolver: zodResolver(SinginSchema),
  });
  const { loading, logintheuser, errorMessages } = useSinginhook();
  const navigate = useNavigate();

  const ongotosingup = () => {
    navigate("/singup");
  };

  const ongotoresetpassword = () => {
    navigate("/reset");
  };

  const onsubmit = async (data: SinginTypes) => {
    try {
      const res = await logintheuser(data);
      console.log(res);
      if (res) {
        toast.success("Successfully signed in the user");
        navigate("/");
      } else {
        toast.error(errorMessages);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while signing in");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 p-4">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl text-slate-200"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign In</h1>
        <div>
          <label
            htmlFor="Email"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="text"
            {...register("Email")}
            className="block w-full p-3 border border-gray-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.Email && (
            <span className="text-sm text-red-500">{errors.Email.message}</span>
          )}
        </div>

        <div className="mt-4">
          <label
            htmlFor="Password"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            {...register("Password")}
            className="block w-full p-3 border border-gray-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring focus:ring-indigo-300"
          />
          {errors.Password && (
            <span className="text-sm text-red-500">
              {errors.Password.message}
            </span>
          )}
        </div>

        <Button
          variant="outlined"
          color="primary"
          className="my-6 w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>

        <div className="text-center">
          <span
            onClick={ongotosingup}
            className="text-slate-200 underline block text-lg cursor-pointer mb-2 sm:mb-4"
          >
            Create Account
          </span>
          <span
            onClick={ongotoresetpassword}
            className="text-slate-200 underline text-lg cursor-pointer"
          >
            Reset Password
          </span>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Singin;
