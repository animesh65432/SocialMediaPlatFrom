import React from "react";
import { useForm } from "react-hook-form";
import useUpdateProfile from "../../../hooks/useUpdateProfile";
import toast, { Toaster } from "react-hot-toast";
import { createPortal } from "react-dom";

type FormData = {
  PhotoUrl: FileList;
  Name: string;
  Gender: string;
};

type props = {
  ontoggole: () => void;
};

const UpdateProfile: React.FC<props> = ({ ontoggole }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const { updateprofile, loading, upload } = useUpdateProfile();
  const onSubmit = async (data: FormData) => {
    try {
      updateprofile(data);
      toast.success("upload it");
      ontoggole();
    } catch (error) {
      console.log(error);
      toast.error("Error uploading profile.");
    }
  };

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="photoUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Photo URL
            </label>
            <input
              type="file"
              id="photoUrl"
              {...register("PhotoUrl")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("Name", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              {...register("Gender", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>
          <button
            onClick={ontoggole}
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Back
          </button>
        </form>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>,
    document.getElementById("overlays") as HTMLElement
  );
};

export default UpdateProfile;
