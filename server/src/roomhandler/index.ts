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

      console.log(NewRoom.Id);
      socket.emit("room-created", { roomId });

      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  };

  // const joinedroom = async ({ roomid, peerid, token }: joinedtheroomtypes) => {
  //   const t = await database.transaction();
  //   try {
  //     socket.join(roomid);

  //     console.log("jointheroomid", roomid);

  //     socket.on("ready", () => {
  //       console.log("ready for user");
  //       socket.to(roomid).emit("user_joined", { peerid });
  //     });

  //     const users = [{}];

  //     socket.emit("Get-participants", { users });

  //     await t.commit();
  //   } catch (error) {
  //     console.error("Error in joinedroom function:", error);
  //     await t.rollback();
  //   }
  // };
  const joinedroom = async ({ roomid, peerid, token }: joinedtheroomtypes) => {
    const t = await database.transaction();
    try {
      if (!roomid || !peerid || !token) {
        throw new Error("roomid, peerid, or token is missing");
      }

      const verifythetoken = jsonwebtoken.verify(
        token,
        config.JSONWEBSECRECT as string
      ) as JwtPayload;

      const { Email } = verifythetoken;

      const user = await Users.findOne({
        where: { Email },
        transaction: t,
      });

      if (!user || user.Id === null || user.Id === undefined) {
        throw new Error("User not found or User ID is invalid");
      }

      const userId = user.Id;

      const [userRoom, created] = await UserRooms.upsert(
        { roomid, userid: userId },
        { transaction: t }
      );

      socket.join(roomid);

      socket.on("ready", () => {
        socket.to(roomid).emit("user_joined", { peerid });
      });

      const participants = await UserRooms.findAll({
        where: { roomid },
        transaction: t,
      });

      const participantswithnames = await Promise.all(
        participants.map(async (participant) => {
          const user = await Users.findOne({
            where: { Id: participant.userid as number },
          });
          return {
            Name: user?.Name,
            Photourl: user?.PhotoUrl,
          };
        })
      );

      console.log(participantswithnames, "users name");

      socket.emit("Get-participants", { participantswithnames });

      await t.commit();
    } catch (error) {
      console.error("Error in joinedroom function:", error);
      await t.rollback();
    }
  };

  socket.on("create-room", createRoom);
  socket.on("joined_room", joinedroom);
};
