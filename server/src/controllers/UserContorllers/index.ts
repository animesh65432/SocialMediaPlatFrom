import { Request, Response } from 'express';
import { RejectResponse, SuccessResponse } from '../../utils';
import { Users } from '../../Models';
import bycrptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import config from '../../Config';

const createtheuser = async (req: Request, res: Response) => {
  try {
    const { Name, Email, Password } = req.body;

    if (!Name || !Email || !Password) {
      return RejectResponse(res, 'invaild credationals', 400);
    }

    const checktheuser = await Users.findOne({
      where: { Email },
    });

    if (checktheuser) {
      return RejectResponse(res, 'user alredy singup', 400);
    }

    const hashpassword = await bycrptjs.hash(Password, 10);
    const newuser = await Users.create({
      Name,
      Email,
      Password: hashpassword,
      PhotoUrl:
        'https://tg-stockach.de/wp-content/uploads/2020/12/5f4d0f15338e20133dc69e95_dummy-profile-pic-300x300.png',
    });

    return SuccessResponse(
      res,
      {
        data: 'sucessfully create the user',
      },
      201,
    );
  } catch (error) {
    console.log(error, 'Error getting From creating User ..');
    return RejectResponse(res, 'internal server errors', 500);
  }
};

const logintheuser = async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return RejectResponse(res, 'invaild credationals', 400);
    }

    const user = await Users.findOne({
      where: { Email },
    });

    if (!user) {
      return RejectResponse(res, 'user did not signup yet', 400);
    }

    const token = jsonwebtoken.sign({ Email }, config.JSONWEBSECRECT as string);

    const checkpassword = await bycrptjs.compare(Password, user.Password);

    if (!checkpassword) {
      return RejectResponse(res, 'Password is wrong', 400);
    }

    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return SuccessResponse(res, { message: 'sucessfully log in', token, user }, 200);
  } catch (error) {
    console.log('error from getting login the user', error);
    return RejectResponse(res, 'internal server errors', 500);
  }
};

const OthersPeoplesSee = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        message: 'userId is required',
      });
    }


    const user = await Users.findOne({
      where: {
        Id: userId,
      },
      attributes: ['Id', 'Name', 'PhotoUrl', 'followers', 'Gender', 'Email'],
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error, `errors in Others Peoples see`);
    return res.status(5000).json({
      message: `internal server errors`,
    });
  }
};


const addfollowers = async (req: Request, res: Response) => {
  try {

    const { userId } = req.params;
    console.log(userId, req.user.followers);

    if (userId === undefined || req.user.followers === undefined) {
      return res.status(400).json({
        message: 'userId and user is undefined',
      });
    }
    const count = req.user.followers += 1;

    const connvertuserIdtoNumber = Number(userId);
    await Users.update({ followers: count }, {
      where: {
        Id: connvertuserIdtoNumber,
      },
    });

    return res.status(200).json({
      messages: 'sucessfully update it',
    });

  } catch (error) {
    console.log(error, `errors in addfollowers`);
    res.status(500).json({
      message: 'internal server errors',
    });

  }
};
export { createtheuser, logintheuser, OthersPeoplesSee, addfollowers };
