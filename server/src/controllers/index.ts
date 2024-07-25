import { createtheuser, logintheuser } from "./UserContorllers";
import { sendEmail, updatePassword } from "./ForgetPassword";
import { createthepost, deletethepost, getthepost, updatePost } from "./Posts";
import { Gettheuserprofile, updatetheprofile } from "./Profile";

const controllers = {
  UserControllers: { createtheuser, logintheuser },
  forgetpassword: { sendEmail, updatePassword },
  post: { createthepost, deletethepost, getthepost, updatePost },
  Profile: { Gettheuserprofile, updatetheprofile },
};
export default controllers;
