import { Request, Response } from "express";
import { RejectResponse, SuccessResponse } from "../../utils";
import { Posts } from "../../Models";
import { gethefile, putthefile } from "../../services";
import database from "../../db";

const createthepost = async (req: Request, res: Response) => {
  try {
    const { img, title, video } = req.body;

    if (!title) {
      return RejectResponse(res, "invaild credatonals", 400);
    }
    let newpost;
    let filename;
    let url;
    if (!video) {
      filename = `${Date.now()}.img`;
      url = await putthefile("img", filename);
      newpost = await Posts.create({
        UserId: req.user?.Id,
        img: filename,
        title,
      });
    } else if (!img) {
      filename = `${Date.now()}.mp4`;
      url = await putthefile("mp4", filename);
      newpost = await Posts.create({
        title,
        UserId: req.user?.Id,
        video: filename,
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
    const posts = (await Posts.findAll({})) || [];

    if (Array.isArray(posts) && posts.length > 0) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].img) {
          let url = await gethefile(posts[i].img as string);
          posts[i].img = url;
        } else if (posts[i].video) {
          let url = await gethefile(posts[i].img as string);
          posts[i].video = url;
        }
      }
    }
    return SuccessResponse(res, { data: posts }, 202);
  } catch (error) {
    console.log("getting errors from get the posts");
    return RejectResponse(res, "internal server errors", 5000);
  }
};

export { createthepost, deletethepost, getthepost };
