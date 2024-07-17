import { Request, Response } from "express";
import { Users, UserFriends } from "../../Models";
import { RejectResponse, SuccessResponse } from "../../utils";
import { Op, literal } from "sequelize";
import database from "../../db";

const getalltheunknowfriends = async (req: Request, res: Response) => {
  try {
    let id = req.user?.Id;

    let users = await Users.findAll({
      where: {
        Id: {
          [Op.ne]: id,
          [Op.notIn]: literal(`(
            SELECT FriendId FROM UserFrineds WHERE UserId = ${id}
          )`),
        },
      },
      attributes: ["Name", "PhotoUrl", "Id"],
    });

    return SuccessResponse(res, { friends: users }, 200);
  } catch (errors) {
    console.log("errors from getting the frineds");
    return RejectResponse(res, "internal server errors", 500);
  }
};
const addthefrined = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    let currenuserid = req.user?.Id;
    const { FrinedId } = req.params;

    let chechuserfriend = await UserFriends.findOne({
      where: {
        UserId: currenuserid,
        FriendId: Number(FrinedId),
      },
    });

    if (chechuserfriend) {
      return RejectResponse(res, "user alredy friends", 400);
    }
    let userfreind = await UserFriends.create(
      {
        UserId: currenuserid,
        FriendId: Number(FrinedId),
      },
      { transaction: t }
    );
    await t.commit();
    return SuccessResponse(res, { message: "sucessfully add the friend" }, 200);
  } catch (error) {
    await t.rollback();
    console.log("errors from adding the frineds", error);
    return RejectResponse(res, "internal server errors", 500);
  }
};
const deletethefrined = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { FrinedId } = req.params;
    console.log(FrinedId);

    // Convert FrinedId to a number and validate
    let friendid = Number(FrinedId);
    if (isNaN(friendid)) {
      console.log(friendid);
      return RejectResponse(res, "Invalid FriendId", 400);
    }

    let chechuserfriend = await UserFriends.findOne({
      where: {
        UserId: req.user?.Id,
        FriendId: friendid,
      },
      transaction: t,
    });

    if (!chechuserfriend) {
      await t.rollback();
      return RejectResponse(res, "User is not friends", 400);
    }

    await chechuserfriend.destroy({ transaction: t });

    await t.commit();
    return SuccessResponse(res, { message: "Successfully deleted" }, 200);
  } catch (error) {
    await t.rollback();
    console.log(error);
    return RejectResponse(res, "Internal server error", 500);
  }
};

const getallthefriend = async (req: Request, res: Response) => {
  try {
    let currentUserId = req.user?.Id;

    let friends = await Users.findAll({
      where: {
        Id: {
          [Op.ne]: currentUserId,
          [Op.in]: literal(
            `(SELECT FriendId FROM UserFrineds WHERE UserId = ${currentUserId})`
          ),
        },
      },
    });

    return SuccessResponse(res, { friends }, 200);
  } catch (error) {
    console.log("errors from getting all friends", error);
    return RejectResponse(res, "internal server errors", 500);
  }
};

export {
  getalltheunknowfriends,
  addthefrined,
  getallthefriend,
  deletethefrined,
};
