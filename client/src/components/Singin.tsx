import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SinginSchema from "../Schema/Singin";
import { SinginTypes } from "../types";
import { useSinginhook } from "../hooks/customhooks";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { Button } from "@/components/ui/button"
import { hero } from "@/utils"
const Singin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SinginTypes>({
    resolver: zodResolver(SinginSchema),
    defaultValues: {
      Email: "test@gmail.com",
      Password: "testPassword"
    }
  });
  const { loading, logintheuser, errorMessages } = useSinginhook();
  const navigate = useNavigate();

  const ongotosingup = () => {
    console.log("click")
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
    <div className="flex items-center justify-center min-h-screen bg-slate-100 text-black p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        <div className="md:w-1/2 flex items-center justify-center mb-6 md:mb-0">
          <img
            src={hero}
            className="w-full h-auto max-w-lg md:max-w-xl"
            alt="Hero"
          />
        </div>
        <div className="md:w-1/2  p-6 rounded-lg shadow-md md:ml-12 text-black bg-white md:h-[50vh]">
          <h1 className="text-3xl mb-6 text-pretty text-center">
            Family Gossip
          </h1>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">

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
            <div className="flex justify-center">
              {!loading &&
                <Button type="submit">
                  Sign In
                </Button>}
              {loading && <CircularProgress />}
            </div>

            <div className="flex flex-col items-center justify-center">
              <p>
                don't have an account? <span
                  className="text-gray-700 underline text-lg cursor-pointer"
                  onClick={ongotosingup}
                >
                  Singup
                </span></p>

              <p className="text-black underline" onClick={ongotoresetpassword}>
                Reset Password
              </p>
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>

  );
};

export default Singin;
