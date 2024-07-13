import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupSchema from "../Schema/Singup";
import { SignupTypes } from "../types";
import useSinguphook from "../hooks/useSinguphook";

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupTypes>({
    resolver: zodResolver(SignupSchema),
  });
  const { loading, createtheuser } = useSinguphook();

  const onSubmit = async (data: SignupTypes) => {
    try {
      let response = await createtheuser(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="UserName">UserName :</label>
        <input type="text" id="UserName" {...register("Name")}></input>
        <span>{errors.Name && errors.Name.message}</span>

        <label htmlFor="Email">Email :</label>
        <input type="email" id="Email" {...register("Email")}></input>
        <span>{errors.Email && errors.Email.message}</span>

        <label htmlFor="Password">Password :</label>
        <input type="password" id="Password" {...register("Password")}></input>
        <span>{errors.Password && errors.Password.message}</span>

        <label htmlFor="ConfirmPassword">Confirm Password :</label>
        <input
          type="password"
          id="ConfirmPassword"
          {...register("ConfirmPassword")}
        ></input>
        <span>{errors.ConfirmPassword && errors.ConfirmPassword.message}</span>

        <button type="submit">{loading ? "loading" : "signup"}</button>
      </form>
    </div>
  );
};

export default Signup;
