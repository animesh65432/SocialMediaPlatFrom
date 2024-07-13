import express from "express";
import controllers from "../../controllers";

const UserRouter = express.Router();

UserRouter.post("/create", controllers.UserControllers.createtheuser);
UserRouter.post("/login", controllers.UserControllers.logintheuser);

export default UserRouter;
