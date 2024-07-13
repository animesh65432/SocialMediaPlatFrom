import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import SinginSchema from "../Schema/Singin";
import { SinginTypes } from "../types";
import useSinginhook from "../hooks/useSinginhook";
import { useNavigate } from "react-router-dom";
const Singin: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SinginTypes>({
    resolver: zodResolver(SinginSchema),
  });
  const { loading, logintheuser } = useSinginhook();
  const navigate = useNavigate();

  const onsubmit = async (data: SinginTypes) => {
    try {
      let res = await logintheuser(data);
      if (res) {
        console.log("login");

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor="Email">Email </label>
        <input type="text" {...register("Email")}></input>
        <span>{errors.Email && errors.Email.message}</span>

        <label htmlFor="Password">Password </label>
        <input type="text" {...register("Password")}></input>
        <span>{errors.Password && errors.Password.message}</span>
        <button>{loading ? "loading" : "Singin"}</button>
      </form>
    </div>
  );
};

export default Singin;
