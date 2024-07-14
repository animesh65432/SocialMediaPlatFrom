import { Router } from "express";
import controllers from "../../controllers";

const forgetPasswordrouter = Router();

forgetPasswordrouter.post("/sent", controllers.forgetpassword.sendEmail);
forgetPasswordrouter.post("/update", controllers.forgetpassword.updatePassword);

export default forgetPasswordrouter;
