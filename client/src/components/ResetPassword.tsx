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
    <div className="flex items-center justify-center min-h-screen bg-slate-800 p-4">
      <form
        className="bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md text-slate-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h1>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          Email
        </label>
        <input
          type="text"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full p-3 border border-gray-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          className="w-full mt-6"
          disabled={loading}
        >
          {loading ? "Loading..." : "Reset Password"}
        </Button>
        <div className="text-center mt-4">
          <span
            className="text-slate-200 underline text-lg cursor-pointer"
            onClick={ongotosinginpage}
          >
            Sign in
          </span>
        </div>
      </form>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ResetPassword;
