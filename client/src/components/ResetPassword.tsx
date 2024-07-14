import React, { useState } from "react";
import useResetPassword from "../hooks/useResetPassword";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      toast.error("Please give your Email");
      return;
    }

    try {
      let result = await resetpassword({ Email });

      if (result) {
        toast.success("Sent it to Email");
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
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
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
        <button
          type="submit"
          className={`mt-6 w-full p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "loading" : "ResetPassword"}
        </button>
        <button
          type="button"
          className="mt-4 w-full p-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={ongotosinginpage}
        >
          Sing in
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
