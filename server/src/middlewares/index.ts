import config from "../Config";
import jwtwebtoken from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import Users, { UserAttributes } from "../Models/Users";
import { RejectResponse } from "../utils";
import { JwtPayload } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: UserAttributes;
    }
  }
}

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return RejectResponse(res, "Token has not been provided", 400);
    }

    const verify = jwtwebtoken.verify(
      token,
      config.JSONWEBSECRECT as string
    ) as JwtPayload;

    if (!verify) {
      return res.status(400).json({
        message: "token is invaild",
      });
    }

    const checkUser = await Users.findOne({
      where: {
        Email: verify.Email,
      },
    });

    if (!checkUser) {
      return RejectResponse(res, "User does not exist", 400);
    }

    req.user = checkUser;

    next();
  } catch (error) {
    console.error("Error from middleware:", error);
    return RejectResponse(res, "Internal Server Error from middleware", 500);
  }
};

export default middleware;
