import { Request, Response } from "express";
import { RejectResponse, SucessResponse } from "../../utils";
import { Users } from "../../Models";
import bycrptjs from "bcryptjs";
const createtheuser = async (req: Request, res: Response) => {
  try {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return RejectResponse(res, "invaild credationals", 400);
    }

    let checktheuser = await Users.findOne({
      where: { Email },
    });

    if (checktheuser) {
      return RejectResponse(res, "user alredy singup", 400);
    }

    let hashpassword = await bycrptjs.hash(Password, 10);
    let newuser = await Users.create({
      Name,
      Email,
      Password: hashpassword,
    });

    return SucessResponse(
      res,
      {
        data: "sucessfully create the user",
      },
      201
    );
  } catch (error) {
    console.log(error, "Error getting From creating User ..");
    return RejectResponse(res, "internal server errors", 500);
  }
};

const logintheuser = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return RejectResponse(res, "invaild credationals", 400);
    }

    let checktheuser = await Users.findOne({
      where: { Email },
    });

    if (!checktheuser) {
      return RejectResponse(res, "user did not signup yet", 400);
    }

    return SucessResponse(res, { message: "sucessfully log in" }, 200);
  } catch (error) {
    console.log("error from getting login the user");
    return RejectResponse(res, "internal server errors", 500);
  }
};

export { createtheuser, logintheuser };
