import React, { useState } from "react";
import { useResetPassword } from "../hooks/customhooks";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const ResetPassword: React.FC = () => {
  const [Email, setEmail] = useState<string>("");
  const { resetpassword, loading, errorMessages } = useResetPassword();
  const navigate = useNavigate();

  const ongotosinginpage = () => {
    navigate("/singin");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!Email) {
      toast.error("Please provide your Email");
      return;
    }

    try {
      const result = await resetpassword({ Email });

      if (result) {
        toast.success("Reset email sent");
      } else {
        toast.error(errorMessages);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while resetting the password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="text"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <Button variant="contained" type="submit" className="w-full mt-4">
          {loading ? "Loading..." : "Reset Password"}
        </Button>
        <span
          className="text-blue-700 underline text-center mt-4 cursor-pointer text-xl"
          onClick={ongotosinginpage}
        >
          Sign in
        </span>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ResetPassword;
