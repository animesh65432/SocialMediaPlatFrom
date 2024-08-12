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
      let response = await updatepassword({ Password, id });

      if (response) {
        toast.success("Successfully updated the password");
      } else {
        toast.error(errorMessages);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-lg shadow-lg w-full max-w-md text-slate-200"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Update Password
        </h1>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-300"
        >
          New Password
        </label>
        <input
          type="password"
          value={Password}
          onChange={(e) => setpassword(e.target.value)}
          className="block w-full p-3 border border-gray-600 rounded-md bg-slate-800 text-white focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className="w-full mt-6"
          disabled={loading}
        >
          {loading ? "Loading..." : "Update Password"}
        </Button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UpdatePassword;
