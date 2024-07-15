import { createtheuser, logintheuser } from "./UserContorllers";
import { sendEmail, updatePassword } from "./ForgetPassword";
import { createthepost, deletethepost, getthepost } from "./Posts";

const controllers = {
  UserControllers: { createtheuser, logintheuser },
  forgetpassword: { sendEmail, updatePassword },
  post: { createthepost, deletethepost, getthepost },
};
export default controllers;
