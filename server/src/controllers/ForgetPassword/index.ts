import { Request, Response } from "express";
import { RejectResponse, SuccessResponse } from "../../utils";
import { Users, ForgetPassword } from "../../Models";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import config from "../../Config";
import bcrypt from "bcryptjs";
import database from "../../db";

const sendEmail = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { Email } = req.body;

    if (!Email) {
      return RejectResponse(res, "Invalid credentials", 400);
    }

    const checkUser = await Users.findOne({
      where: { Email },
      transaction: t,
    });

    if (!checkUser) {
      return RejectResponse(res, "User has not signed up yet", 400);
    }

    const id = uuidv4();

    const forgetPassword = await ForgetPassword.create(
      {
        UserId: checkUser.Id,
        id,
        active: false,
      },
      { transaction: t }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.NODEMAILERUSER,
        pass: config.NODEMAILERPASSWORD,
      },
    });

    const mailOptions = {
      from: config.NODEMAILERUSER,
      to: Email,
      subject: "Password Reset Request",
      html: `<a href='https://social-media-plat-from.vercel.app/update/${forgetPassword.id}'>Click here to reset your password</a>`,
    };

    await transporter.sendMail(mailOptions);

    await t.commit();

    return SuccessResponse(res, { message: "Email sent successfully" }, 201);
  } catch (error) {
    await t.rollback();
    console.error("Error sending email:", error);
    return RejectResponse(res, "Internal server error", 500);
  }
};

const updatePassword = async (req: Request, res: Response) => {
  const t = await database.transaction();
  try {
    const { Password, id } = req.body;

    if (!id) {
      return RejectResponse(res, "No ID provided", 400);
    }

    if (!Password) {
      return RejectResponse(res, "No password provided", 400);
    }

    const forgetPassword = await ForgetPassword.findOne({
      where: { id },
      transaction: t,
    });

    console.log(forgetPassword);

    if (!forgetPassword || forgetPassword.active) {
      return RejectResponse(
        res,
        "Password reset link is invalid or expired",
        400
      );
    }

    const user = await Users.findOne({
      where: { Id: forgetPassword.UserId },
      transaction: t,
    });

    if (!user) {
      return RejectResponse(res, "User not found", 404);
    }

    const hashPassword = await bcrypt.hash(Password, 10);

    await user.update({ Password: hashPassword }, { transaction: t });

    await forgetPassword.update({ active: false }, { transaction: t });

    await t.commit();

    return SuccessResponse(
      res,
      { message: "Password updated successfully" },
      200
    );
  } catch (error) {
    await t.rollback();
    console.error("Error updating password:", error);
    return RejectResponse(res, "Internal server error", 500);
  }
};

export { sendEmail, updatePassword };
