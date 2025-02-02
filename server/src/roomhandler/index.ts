import { Socket } from 'socket.io';
import { v4 as uuidV4 } from 'uuid';
import { Room, UserRooms, Users } from '../Models';
import { joinedtheroomtypes, removeroomtypes } from '../types';
import database from '../db';
import { Op } from 'sequelize';

export const roomHandler = (socket: Socket) => {
  const createRoom = async () => {
    const t = await database.transaction();
    try {
      const roomId = uuidV4();
      socket.join(roomId);
      const NewRoom = await Room.create(
        { Id: roomId },
        { transaction: t },
      );

      console.log('room Id', NewRoom.Id);
      socket.emit('room-created', { roomId });

      await t.commit();
    } catch (error) {
      console.log(error);
      await t.rollback();
    }
  };

  const joinedroom = async ({ roomId, userId, peerId }: joinedtheroomtypes) => {
    const t = await database.transaction();
    try {
      console.log(`new user joined in these room roomid:${roomId} peerId :${peerId} userId ${userId}`);
      const user = await Users.findByPk(userId);
      if (!user) {
        throw new Error(`User with id ${userId} does not exist.`);
      }

      const room = await Room.findOne({
        where: {
          Id: roomId,
        },
        transaction: t,
      });

      if (!room) throw new Error('Room did not found');

      const checkuserroomalredypresent = await UserRooms.findOne({
        where: {
          roomid: roomId,
          userid: userId,
        },
      });

      if (checkuserroomalredypresent) {
        throw new Error('user alredy present');
      }
      const userrooms = await UserRooms.upsert({ roomid: roomId, userid: userId, peerId }, { transaction: t });


      const users = await UserRooms.findAll({
        where: {
          roomid: roomId,
          userid: { [Op.ne]: userId },
        },
        include: {
          model: Users,
          attributes: ['Id', 'Name', 'PhotoUrl'],
        },
        transaction: t,
      });

      socket.join(roomId);

      socket.on('ready', () => {
        console.log('call the ready');
        socket.to(roomId).emit('user-joined', { peerId });
      });

      socket.emit('Get-Users', { users });
      socket.to(roomId).emit('Get-Users', { userId, peerId });
      await t.commit();
    } catch (error) {
      console.error('Error in joinedroom function:', error);
      await t.rollback();
    }
  };

  const removeroom = async ({ roomId, userId, peerId }: removeroomtypes) => {
    const t = await database.transaction();
    try {

      console.log(`roomId :${roomId} pperId :${peerId} ,userId ${userId} remove room get called`);
      if (!roomId || !userId || !peerId) {
        throw new Error('roomId and userId needed');
      }

      const room = await Room.findOne({
        where: {
          Id: roomId,
        },
        transaction: t,
      });

      if (!room) throw new Error('Room did not found');

      await UserRooms.destroy({
        where: {
          roomid: roomId,
          userid: userId,
          peerId,
        },
        transaction: t,
      });

      const users = await UserRooms.findAll({
        where: { roomid: roomId, userid: { [Op.ne]: userId } },
        include: {
          model: Users,
          attributes: ['Id', 'Name', 'PhotoUrl'],
        },
        transaction: t,
      });


      socket.to(roomId).emit('user-left', { users, peerId });
      console.log('users', users, peerId);
      await t.commit();

    } catch (error) {
      await t.rollback();
      console.log(`error in removeromom`);
    }

  };



  socket.on('create-room', createRoom);
  socket.on('joined_room', joinedroom);
  socket.on(`remove-room`, removeroom);

};