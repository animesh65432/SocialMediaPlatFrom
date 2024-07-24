import { createtheuser, logintheuser } from "./UserContorllers";
import { sendEmail, updatePassword } from "./ForgetPassword";
import { createthepost, deletethepost, getthepost, updatePost } from "./Posts";

const controllers = {
  UserControllers: { createtheuser, logintheuser },
  forgetpassword: { sendEmail, updatePassword },
  post: { createthepost, deletethepost, getthepost, updatePost },
};
export default controllers;
