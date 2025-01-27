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

  const joinedroom = async ({ roomid, peerid, token }: joinedtheroomtypes) => {
    const t = await database.transaction();
    try {
      if (!roomid || !peerid || !token) {
        console.log(roomid, peerid, token, "from joined function");
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

      // Store user information in socket for later use
      socket.data.userId = userId;
      socket.data.roomId = roomid;
      socket.data.peerId = peerid;

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
            peerId: peerid, // Include peerId for identification
          };
        })
      );

      console.log(participantswithnames, "users name");
      socket.emit("Get-participants", { participantswithnames });

      // Broadcast to others that a new user has joined
      socket.to(roomid).emit("participant_joined", {
        Name: user.Name,
        Photourl: user.PhotoUrl,
        peerId: peerid,
      });

      await t.commit();
    } catch (error) {
      console.error("Error in joinedroom function:", error);
      await t.rollback();
    }
  };

  // Handle disconnection
  const handleDisconnect = async () => {
    const t = await database.transaction();
    try {
      const { userId, roomId, peerId } = socket.data;

      if (userId && roomId) {
        // Remove user from UserRooms table
        await UserRooms.destroy({
          where: {
            userid: userId,
            roomid: roomId,
          },
          transaction: t,
        });

        // Get user information to send in the disconnect event
        const user = await Users.findOne({
          where: { Id: userId },
          transaction: t,
        });

        // Notify others in the room that user has left
        socket.to(roomId).emit("participant_left", {
          peerId,
          Name: user?.Name,
          Photourl: user?.PhotoUrl,
        });

        // Check if room is empty
        const remainingParticipants = await UserRooms.count({
          where: { roomid: roomId },
          transaction: t,
        });

        if (remainingParticipants === 0) {
          // Optional: Delete the room if it's empty
          await Room.destroy({
            where: { Id: roomId },
            transaction: t,
          });
        }
      }

      await t.commit();
    } catch (error) {
      console.error("Error in disconnect handler:", error);
      await t.rollback();
    }
  };

  socket.on("create-room", createRoom);
  socket.on("joined_room", joinedroom);
  socket.on("disconnect", handleDisconnect);
};