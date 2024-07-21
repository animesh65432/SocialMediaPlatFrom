import React, { useState } from "react";
import useUpdatePassword from "../hooks/useUpdatePassword";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { Button } from "@mui/material";

const UpdatePassword: React.FC = () => {
  const { id } = useParams();
  const [Password, setpassword] = useState<string>("");
  const { loading, errorMessages, updatepassword } = useUpdatePassword();

  if (!id) {
    return <NotFound />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let respose = await updatepassword({ Password, id });

      if (respose) {
        toast.success("Sucessfully update it");
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
          Password
        </label>
        <input
          type="text"
          value={Password}
          onChange={(e) => setpassword(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />

        <Button type="submit" variant="contained" className="w-full">
          {loading ? "loading" : "Update Password"}
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default UpdatePassword;
