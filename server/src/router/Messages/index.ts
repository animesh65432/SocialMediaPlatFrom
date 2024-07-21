import controllers from "../../controllers";
import middleware from "../../middlewares";
import { Router } from "express";

const MessagesRouter = Router();

MessagesRouter.post(
  "/sent/:Id",
  middleware,
  controllers.messages.sendthemessage
);

export default MessagesRouter;
