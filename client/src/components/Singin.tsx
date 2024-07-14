import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SinginSchema from "../Schema/Singin";
import { SinginTypes } from "../types";
import useSinginhook from "../hooks/useSinginhook";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
      let res = await logintheuser(data);
      console.log(res);
      if (res) {
        toast.success("Successfully signed in the user");
        navigate("/");
      } else {
        toast.error(errorMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

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

        <button
          type="submit"
          className={`mt-6 w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <button
          type="button"
          className="mt-4 w-full p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={ongotosingup}
        >
          Create Account
        </button>
        <button
          type="button"
          className="mt-4 w-full p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={ongotoresetpassword}
        >
          Reset Password
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Singin;
