import { DataTypes, Model } from "sequelize";
import database from "../../db";

interface RoomsTypes {
  Id: string;
  Name: string;
  Topics: string;
}

interface Roomsinstances extends Model<RoomsTypes>, RoomsTypes {}

const Room = database.define<Roomsinstances>("Room", {
  Id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Topics: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Room;
