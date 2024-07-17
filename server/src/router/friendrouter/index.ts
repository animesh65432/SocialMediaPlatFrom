import { Router } from "express";
import controllers from "../../controllers";
import middleware from "../../middlewares";

const friendsrouter = Router();

friendsrouter.post(
  "/add/:FrinedId",
  middleware,
  controllers.friends.addthefrined
);
friendsrouter.get(
  "/unknownfriends",
  middleware,
  controllers.friends.getalltheunknowfriends
);
friendsrouter.get("/friends", middleware, controllers.friends.getallthefriend);
friendsrouter.delete(
  "delete/:FrinedId",
  middleware,
  controllers.friends.deletethefrined
);

export default friendsrouter;
