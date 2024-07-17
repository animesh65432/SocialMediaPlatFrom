import { createtheuser, logintheuser } from "./UserContorllers";
import { sendEmail, updatePassword } from "./ForgetPassword";
import { createthepost, deletethepost, getthepost, updatePost } from "./Posts";
import {
  getallthefriend,
  addthefrined,
  getalltheunknowfriends,
  deletethefrined,
} from "./Friends";

const controllers = {
  UserControllers: { createtheuser, logintheuser },
  forgetpassword: { sendEmail, updatePassword },
  post: { createthepost, deletethepost, getthepost, updatePost },
  friends: {
    getallthefriend,
    addthefrined,
    getalltheunknowfriends,
    deletethefrined,
  },
};
export default controllers;
