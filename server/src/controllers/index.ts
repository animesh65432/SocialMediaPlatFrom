import { createtheuser, logintheuser, OthersPeoplesSee, addfollowers } from './UserContorllers';
import { sendEmail, updatePassword } from './ForgetPassword';
import { createthepost, deletethepost, getthepost, updatePost } from './Posts';
import { updatetheprofile } from './Profile';
import { GetalltheRooms, deletetherooms } from './Rooms';

const controllers = {
  UserControllers: { createtheuser, logintheuser, OthersPeoplesSee, addfollowers },
  forgetpassword: { sendEmail, updatePassword },
  post: { createthepost, deletethepost, getthepost, updatePost },
  Profile: { updatetheprofile },
  Room: { GetalltheRooms, deletetherooms },
};
export default controllers;
