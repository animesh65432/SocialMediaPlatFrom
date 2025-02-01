import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import useUpdateProfile from "../../../hooks/useUpdateProfile";
import toast, { Toaster } from "react-hot-toast";
import UpdateProfileSchema from "@/Schema/UpdateProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar } from "@mui/material"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select"
interface UpdateProfileArguments {
  Gender?: string;
  Name?: string;
  PhotoUrl?: string;
}

const UpdateProfile: React.FC = () => {
  const Currentuser = useSelector((state: RootState) => state.user.user);
  const [imageprivew, setimageprivew] = useState<string>("")
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      Name: Currentuser.Name,
      PhotoUrl: Currentuser.PhotoUrl,
      Gender: Currentuser.Gender,
    },
  });
  const { updateprofile, loading } = useUpdateProfile();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = function () {
        if (typeof reader.result === "string") {
          setimageprivew(reader.result)
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: z.infer<typeof UpdateProfileSchema>) => {
    try {
      if (data.Gender?.length === 0 || data.Name?.length === 0 || imageprivew.length === 0) {
        toast.error("did not chnage anything")
      }
      else {
        const agruments: UpdateProfileArguments = {}
        if (data.Gender) agruments.Gender = data.Gender
        if (data.Name) agruments.Name = data.Name
        if (imageprivew.length > 0) agruments.PhotoUrl = imageprivew
        await updateprofile(agruments)
        toast.success("update the profile")

      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile.");
    }
  };

  return (
    <>
      <div className="h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="flex justify-center">
                {
                  !imageprivew &&
                  <>{Currentuser.PhotoUrl ? <Avatar src={Currentuser.PhotoUrl} alt="User Profile" style={{ height: "15vh", width: "15vw" }} /> : <>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkr94Z9oGA_KuzX9ghnsctIEudavAJJht_VUyCDUw6c8eBeijX1Hg1RA6ckmWhBVNUlx4&usqp=CAU" className="w-20 h-20 rounded-lg" /></>
                  }</>
                }
                {
                  imageprivew && <img src={imageprivew} className="w-20 h-20 rounded-lg" />
                }
              </div>
              <FormField
                control={form.control}
                name="PhotoUrl"
                render={({ }) => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChangeCapture={handleFileChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} value={field.value ? field.value : ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value ? field.value : ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-center">
                <Button type="submit" disabled={loading} >
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default UpdateProfile;
