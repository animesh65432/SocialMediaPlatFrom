import { DataTypes, Model, Optional } from "sequelize";
import database from "../../db";
interface UserRoomsAttributes {
  roomid: string;
  userid?: number | null;
}

interface UserRoomsCreationAttributes
  extends Optional<UserRoomsAttributes, "roomid"> {}

interface UserRoomsInstance
  extends Model<UserRoomsAttributes, UserRoomsCreationAttributes>,
    UserRoomsAttributes {}

const UserRooms = database.define<UserRoomsInstance>("UserRooms", {
  roomid: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default UserRooms;
