import config from "../Config";
import jwtwebtoken from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import Users, { UserAttributes } from "../Models/Users";
import { RejectResponse } from "../utils";

type JwtPayload = {
  Email: string;
};

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
    console.log(token);

    if (!token) {
      return RejectResponse(res, "Token has not been provided", 400);
    }

    const verify = jwtwebtoken.verify(
      token,
      config.JSONWEBSECRECT as string
    ) as JwtPayload;

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
