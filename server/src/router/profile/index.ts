import { Router } from "express";
import controllers from "../../controllers";
import middleware from "../../middlewares";

const profilerouter = Router();

profilerouter.get("/Get", middleware, controllers.Profile.Gettheuserprofile);
profilerouter.put("/update", middleware, controllers.Profile.updatetheprofile);

export default profilerouter;
