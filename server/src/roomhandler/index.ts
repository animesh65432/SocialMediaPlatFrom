import { Socket } from "socket.io";
import config from "../Config";
import { v4 as uuidV4 } from "uuid";
import { Room, UserRooms, Users } from "../Models";
import { createroomtypes, joinedtheroomtypes } from "../types";
import jsonwebtoken from "jsonwebtoken";
import database from "../db";
import { JwtPayload } from "../types";
export const roomHandler = (socket: Socket) => {
  const createRoom = async ({ Name, Topics }: createroomtypes) => {
    const t = await database.transaction();
    try {
      const roomId = uuidV4();
      socket.join(roomId);
      let NewRoom = await Room.create(
        { Id: roomId, Name, Topics },
        { transaction: t }
      );
      let userrooms = await UserRooms.create(
        { roomid: roomId },
        { transaction: t }
      );
      socket.emit("room-created", { roomId });
      console.log("user created the room");

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  };

  const joinedroom = async ({ roomid, peerid, token }: joinedtheroomtypes) => {
    const t = await database.transaction();
    try {
      const verifythetoken = jsonwebtoken.verify(
        token,
        config.JSONWEBSECRECT as string
      ) as JwtPayload;

      const { Email } = verifythetoken;

      let user = await Users.findOne({
        where: { Email },
        transaction: t,
      });

      await UserRooms.update(
        { userid: user?.Id },
        { where: { roomid }, transaction: t }
      );

      const getparticipants = async () => {
        let users = await UserRooms.findAll({
          where: { roomid },
          include: {
            model: Users,
            attributes: ["Name"],
          },
        });
        return users;
      };

      const participants = await getparticipants();

      socket.emit("Get-participants", participants);

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  };

  socket.on("create-room", createRoom);
  socket.on("joined_room", joinedroom);
};
