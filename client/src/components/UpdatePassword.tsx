import React, { useState } from "react";
import useUpdatePassword from "../hooks/useUpdatePassword";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@mui/material"

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
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className=" bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-black"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Update Password
        </h1>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium "
        >
          New Password
        </label>
        <input
          type="password"
          value={Password}
          onChange={(e) => setpassword(e.target.value)}
          className="block w-full p-3 border border-gray-600 rounded-md  text-white focus:outline-none focus:ring focus:ring-indigo-300"
        />
        <div className="flex justify-center">
          {!loading && <Button
            type="submit"
            className="mt-6"
            disabled={loading}
          >
            Update Password
          </Button>}
          {loading && <CircularProgress />}
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UpdatePassword;
