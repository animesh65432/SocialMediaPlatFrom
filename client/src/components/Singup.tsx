import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupSchema from "../Schema/Singup";
import { SignupTypes } from "../types";
import useSinguphook from "../hooks/useSinguphook";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupTypes>({
    resolver: zodResolver(SignupSchema),
  });
  const { loading, createtheuser, errorMessages } = useSinguphook();
  const navigate = useNavigate();

  const onlogintosingin = () => {
    navigate("/singin");
  };

  const onSubmit = async (data: SignupTypes) => {
    try {
      let response = await createtheuser(data);
      if (response) {
        toast.success("Sucessfully singup The User");
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
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
        <label
          htmlFor="UserName"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          UserName :
        </label>
        <input
          type="text"
          id="UserName"
          {...register("Name")}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        ></input>
        <span className="text-sm text-red-600">
          {errors.Name && errors.Name.message}
        </span>

        <label
          htmlFor="Email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email :
        </label>
        <input
          type="email"
          id="Email"
          {...register("Email")}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        ></input>
        <span className="text-sm text-red-600">
          {errors.Email && errors.Email.message}
        </span>

        <label
          htmlFor="Password"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Password :
        </label>
        <input
          type="password"
          id="Password"
          {...register("Password")}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        ></input>
        <span>{errors.Password && errors.Password.message}</span>

        <label
          htmlFor="ConfirmPassword"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Confirm Password :
        </label>
        <input
          type="password"
          id="ConfirmPassword"
          {...register("ConfirmPassword")}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        ></input>
        <span className="text-sm text-red-600">
          {errors.ConfirmPassword && errors.ConfirmPassword.message}
        </span>

        <button
          type="submit"
          className={`mt-6 w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {" "}
          {loading ? "Loading..." : "Sign up"}
        </button>
        <button
          onClick={onlogintosingin}
          className="mt-4 w-full p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          login
        </button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Signup;
