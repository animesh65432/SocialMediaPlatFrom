import controllers from "../../controllers";
import middleware from "../../middlewares";
import { Router } from "express";

const router = Router();

router.get("/Get", middleware, controllers.Room.GetalltheRooms);
router.delete("/delete/:Id", middleware, controllers.Room.deletethepost);
export default router;
