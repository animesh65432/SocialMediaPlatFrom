import { Socket } from "socket.io";
import config from "../Config";
import { v4 as uuidV4 } from "uuid";
import { Room, UserRooms, Users } from "../Models";
import { createroomtypes, joinedtheroomtypes } from "../types";
import jsonwebtoken from "jsonwebtoken";
import database from "../db";
import { JwtPayload } from "../types";

export const roomHandler = (socket: Socket) => {
  const createRoom = async ({ Name, Topics, token }: createroomtypes) => {
    const t = await database.transaction();
    try {
      const roomId = uuidV4();
      socket.join(roomId);
      let NewRoom = await Room.create(
        { Id: roomId, Name, Topics },
        { transaction: t }
      );

      console.log(NewRoom.Id);
      socket.emit("room-created", { roomId });

      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  };

  const joinedroom = ({ roomid, peerid, token }: joinedtheroomtypes) => {
    // const verifythetoken = jsonwebtoken.verify(
    //   token,
    //   config.JSONWEBSECRECT as string
    // ) as JwtPayload;

    // const { Email } = verifythetoken;

    // let user = await Users.findOne({
    //   where: { Email },
    //   transaction: t,
    // });

    // let checkuserrooms = await UserRooms.findOne({ where: { roomid } });

    // if (checkuserrooms) {
    //   await UserRooms.update(
    //     { userid: user?.Id },
    //     { where: { roomid }, transaction: t }
    //   );
    // } else {
    //   await UserRooms.update(
    //     { userid: user?.Id },
    //     { where: { roomid }, transaction: t }
    //   );
    // }

    socket.join(roomid);

    socket.on("ready", () => {
      socket.to(roomid).emit("user_joined", { peerid });
    });

    // const getparticipants = async () => {
    //   let users = await UserRooms.findAll({
    //     where: { roomid },
    //     include: {
    //       model: Users,
    //       attributes: ["Name"],
    //     },
    //   });
    //   return users;
    // };

    const participants = [{}];

    socket.emit("Get-participants", { participants });
  };

  socket.on("create-room", createRoom);
  socket.on("joined_room", joinedroom);
};
