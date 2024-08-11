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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <label
          htmlFor="Email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          {...register("Email")}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        {errors.Email && (
          <span className="text-sm text-red-500">{errors.Email.message}</span>
        )}

        <label
          htmlFor="Password"
          className="block mt-4 mb-2 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          {...register("Password")}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        {errors.Password && (
          <span className="text-sm text-red-500">
            {errors.Password.message}
          </span>
        )}

        <Button
          variant="contained"
          color="primary"
          className="my-5 w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
        </Button>
        <span
          onClick={ongotosingup}
          className="text-blue-600 underline block text-xl ml-28"
        >
          Create Acoount
        </span>
        <span
          onClick={ongotoresetpassword}
          className="text-blue-600 underline text-xl ml-28"
        >
          Reset Password
        </span>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Singin;
