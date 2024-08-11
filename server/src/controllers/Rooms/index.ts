import { Room } from "../../Models";
import { Request, Response } from "express";

const GetalltheRooms = async (req: Request, res: Response) => {
  try {
    let Rooms = await Room.findAll({});
    return res.status(200).json({
      Rooms,
    });
  } catch (error) {
    return res.status(400).json({ message: "internal server errors" });
  }
};

const deletetherooms = async (req: Request, res: Response) => {
  try {
    const { Id } = req.params;

    await Room.destroy({
      where: {
        Id,
      },
    });

    return res.status(200).json({
      message: "delete the rooms",
    });
  } catch (error) {
    return res.status(400).json({
      message: "internal server errors",
    });
  }
};

export { GetalltheRooms, deletetherooms };
