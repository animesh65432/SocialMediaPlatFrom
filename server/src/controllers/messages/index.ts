import { Request, Response } from "express";
import { RejectResponse, SuccessResponse } from "../../utils";
import { Messages } from "../../Models";

const sendthemessage = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;
    const { message } = req.body;

    let receiverId = Number(Id);

    if (!message || !receiverId) {
      return RejectResponse(res, "invaild creatdionals", 400);
    }

    let new_message = await Messages.create({
      text: message,
      senderId: req.user?.Id,
      receiverId,
    });

    return SuccessResponse(res, { data: "sucessfully sent to the user" }, 202);
  } catch (error) {
    console.log(error);
    return RejectResponse(res, "internal server errors", 400);
  }
};

export { sendthemessage };
