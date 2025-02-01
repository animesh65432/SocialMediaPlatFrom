import { DataTypes, Model } from 'sequelize';
import database from '../../db';
import { RoomsTypes } from '../../types/models/Rooms';

interface Roomsinstances extends Model<RoomsTypes>, RoomsTypes { }

const Room = database.define<Roomsinstances>('Room', {
  Id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
});

export default Room;
