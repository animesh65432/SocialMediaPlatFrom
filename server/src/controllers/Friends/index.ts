import { Request, Response } from "express";
import { Users, UserFriends } from "../../Models";
import { RejectResponse, SuccessResponse } from "../../utils";
import { Model, Op } from "sequelize";
import database from "../../db";

const getalltheunknowfriends = async (req: Request, res: Response) => {
  try {
    let id = req.user?.Id;

    let users = await Users.findAll({
      where: {
        Id: {
          [Op.ne]: id,
        },
      },
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
        FrinedId: Number(FrinedId),
      },
    });

    if (chechuserfriend) {
      return RejectResponse(res, "user alredy friends", 400);
    }
    let userfreind = await UserFriends.create(
      {
        UserId: currenuserid,
        FrinedId: Number(FrinedId),
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

    let chechuserfriend = await UserFriends.findOne({
      where: {
        UserId: req.user?.Id,
        FrinedId: Number(FrinedId),
      },
      transaction: t,
    });

    if (!chechuserfriend) {
      return RejectResponse(res, "user is not friends", 400);
    }

    await chechuserfriend.destroy({ transaction: t });

    await t.commit();
    return SuccessResponse(res, { message: "sucessfully delete it" }, 200);
  } catch (error) {
    await t.rollback();
    console.log(error);
    return RejectResponse(res, "internal server errors", 500);
  }
};
const getallthefriend = async (req: Request, res: Response) => {
  try {
    let currenuserid = req.user?.Id;

    let friends = await UserFriends.findAll({
      where: {
        id: currenuserid,
      },
      include: [
        {
          model: Users,
          attributes: [],
        },
      ],
    });

    return SuccessResponse(res, { friends }, 200);
  } catch (error) {
    return RejectResponse(res, "intrenal server errors", 500);
  }
};
export {
  getalltheunknowfriends,
  deletethefrined,
  addthefrined,
  getallthefriend,
};
