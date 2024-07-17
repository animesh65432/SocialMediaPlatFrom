import { Request, Response } from "express";
import { RejectResponse, SuccessResponse } from "../../utils";
import { Users } from "../../Models";
import bycrptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import config from "../../Config";
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

    return SuccessResponse(
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

    let token = jsonwebtoken.sign({ Email }, config.JSONWEBSECRECT as string);

    let checkpassword = await bycrptjs.compare(Password, checktheuser.Password);

    if (!checkpassword) {
      return RejectResponse(res, "Password is wrong", 400);
    }

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return SuccessResponse(res, { message: "sucessfully log in", token }, 200);
  } catch (error) {
    console.log("error from getting login the user", error);
    return RejectResponse(res, "internal server errors", 500);
  }
};

export { createtheuser, logintheuser };
