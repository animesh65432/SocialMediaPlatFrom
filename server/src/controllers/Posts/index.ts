import { Request, Response } from "express";
import { RejectResponse, SuccessResponse } from "../../utils";
import { Posts } from "../../Models";
import database from "../../db";
import { store_the_images_into_cloudinary, store_the_videos_into_cloudinary } from "../../utils"
import { Users } from "../../Models"
const createthepost = async (req: Request, res: Response) => {
  try {
    const { img, title, video } = req.body;
    let user = req.user;

    if (!title || !user) {
      return RejectResponse(res, "invaild credatonals", 400);
    }
    let newpost
    let url;
    if (!video) {
      url = await store_the_images_into_cloudinary(img)
      newpost = await Posts.create({
        UserId: user.Id,
        img: url,
        title
      });
    } else if (!img) {
      url = await store_the_videos_into_cloudinary(video)
      newpost = await Posts.create({
        title,
        UserId: user.Id,
        video: url,
      });
    }

    return SuccessResponse(
      res,
      { message: "sucessfully create the post", url },
      201
    );
  } catch (error) {
    console.log("getting errors from createing the post", error);
    return RejectResponse(res, "internal server errors", 500);
  }
};
const deletethepost = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { id } = req.params;
    let UserId = req.user?.Id;

    if (!id || !UserId) {
      return RejectResponse(res, "invaild credationals", 400);
    }

    let post = await Posts.findOne({
      where: {
        id,
        UserId,
      },
      transaction: t,
    });

    if (!post) {
      return RejectResponse(res, "did not find the post", 400);
    }
    await post.destroy({ transaction: t });
    await t.commit();
    return SuccessResponse(
      res,
      { message: "suceesfully delete the post" },
      200
    );
  } catch (error) {
    await t.rollback();
    console.log("getting errors from deletepost", error);

    return RejectResponse(res, "internal server errors", 500);
  }
};
const getthepost = async (req: Request, res: Response) => {
  try {
    const posts = await Posts.findAll({
      include: {
        model: Users,
        attributes: ["Name", "PhotoUrl", "Id"]
      }
    })
    return SuccessResponse(res, { data: posts }, 202);
  } catch (error) {
    console.log("getting errors from get the posts");
    return RejectResponse(res, "internal server errors", 5000);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { id } = req.params;
    const { title, video, img } = req.body;

    if (!title) {
      return RejectResponse(res, "atleast change the title", 400);
    }

    const post = await Posts.findOne({
      where: {
        UserId: req.user?.Id,
        id,
      },
      transaction: t,
    });

    if (!post) {
      return RejectResponse(res, "Post not found", 400);
    }

    let url;

    if (video) {
      url = await store_the_videos_into_cloudinary(video)

      if (title) {
        await post.update({ video: url, title }, { transaction: t });
      } else {
        await post.update({ video: url }, { transaction: t });
      }
    } else if (img) {
      url = await store_the_images_into_cloudinary(img)
      if (title) {
        await post.update({ img: url, title }, { transaction: t });
      } else {
        await post.update({ img: url }, { transaction: t });
      }
    }

    await t.commit();
    return SuccessResponse(res, { message: "Successfully updated", url }, 202);
  } catch (error) {
    await t.rollback();
    console.error("Error updating post:", error);
    return RejectResponse(res, "Internal server error", 500);
  }
};

export { createthepost, deletethepost, getthepost, updatePost };
