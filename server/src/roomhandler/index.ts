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

      if (!user) {
        throw new Error("User not found");
      }

      const checkuserrooms = await UserRooms.findOne({
        where: { roomid },
        transaction: t,
      });

      if (!checkuserrooms) {
        await UserRooms.create({ roomid, userid: user.Id }, { transaction: t });
      } else {
        await UserRooms.update(
          { userid: user.Id },
          { where: { roomid }, transaction: t }
        );
      }

      socket.join(roomid);

      socket.on("ready", () => {
        socket.to(roomid).emit("user_joined", { peerid });
      });

      const participants = await UserRooms.findAll({
        where: { roomid },
        transaction: t,
      });

      let participantswithnames = [];

      for (let i = 0; i < participants.length; i++) {
        let userid = participants[i].userid;
        if (userid) {
          let user = await Users.findOne({
            where: {
              Id: userid,
            },
          });
          participantswithnames.push(user?.Name);
        }
      }

      console.log(participantswithnames, "users name");

      socket.emit("Get-participants", { participantswithnames });

      await t.commit(); // Commit the transaction
    } catch (error) {
      console.error("Error in joinedroom function:", error);
      await t.rollback(); // Rollback the transaction in case of error
    }
  };

  socket.on("create-room", createRoom);
  socket.on("joined_room", joinedroom);
};
