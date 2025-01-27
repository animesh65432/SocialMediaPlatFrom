import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupSchema from "../Schema/Singup";
import { SignupTypes } from "../types";
import { useSinguphook } from "../hooks/customhooks";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { CircularProgress } from "@mui/material";
import { hero } from "../utils";

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
        toast.success("Successfully signed up the user");
      } else {
        toast.error(errorMessages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 text-black p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        <div className="md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          <img
            src={hero}
            className="w-full h-auto max-w-lg md:max-w-xl"
            alt="Hero"
          />
        </div>
        <div className="md:w-1/2  p-6 rounded-lg shadow-md md:ml-12 text-black bg-white">
          <h1 className="text-3xl mb-6 text-pretty text-center">
            Family Gossip
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="UserName"
                className="block mb-2 text-sm font-medium  text-black"
              >
                UserName:
              </label>
              <input
                type="text"
                id="UserName"
                {...register("Name")}
                className="block w-full p-2 border border-gray-600 rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-gray-300"
              />
              <span className="text-sm text-red-600">
                {errors.Name && errors.Name.message}
              </span>
            </div>

            <div>
              <label
                htmlFor="Email"
                className="block mb-2 text-sm font-medium "
              >
                Email:
              </label>
              <input
                type="email"
                id="Email"
                {...register("Email")}
                className="block w-full p-2 border border-gray-600 rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-gray-300"
              />
              <span className="text-sm text-red-600">
                {errors.Email && errors.Email.message}
              </span>
            </div>

            <div>
              <label
                htmlFor="Password"
                className="block mb-2 text-sm font-medium "
              >
                Password:
              </label>
              <input
                type="password"
                id="Password"
                {...register("Password")}
                className="block w-full p-2 border border-gray-600 rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-gray-300"
              />
              <span className="text-sm text-red-600">
                {errors.Password && errors.Password.message}
              </span>
            </div>

            <div>
              <label
                htmlFor="ConfirmPassword"
                className="block mb-2 text-sm font-medium "
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="ConfirmPassword"
                {...register("ConfirmPassword")}
                className="block w-full p-2 border border-gray-600 rounded-md bg-white text-black focus:outline-none focus:ring focus:ring-gray-300"
              />
              <span className="text-sm text-red-600">
                {errors.ConfirmPassword && errors.ConfirmPassword.message}
              </span>
            </div>
            <div className="flex justify-center">
              {!loading && <Button type="submit">
                Sign up
              </Button>}

              {loading && <CircularProgress />}
            </div>

            <div className="text-center">
              <p>
                do you have an account? <span
                  className="text-gray-700 underline text-lg cursor-pointer"
                  onClick={onlogintosingin}
                >
                  Login
                </span></p>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Signup;