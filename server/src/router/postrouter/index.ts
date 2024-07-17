import { Router } from "express";
import controllers from "../../controllers";
import middleware from "../../middlewares";

const PostRouter = Router();

PostRouter.post("/createpost", middleware, controllers.post.createthepost);

PostRouter.delete(
  "/deletepost/:id",
  middleware,
  controllers.post.deletethepost
);

PostRouter.get("/GetThePost", middleware, controllers.post.getthepost);
PostRouter.put("/update/:id", middleware, controllers.post.updatePost);

export default PostRouter;
