import database from "../../db";
import { DataTypes, Model } from "sequelize";

interface userroomstypes {
  roomid?: string;
  userid?: number;
}

interface UserRoomsInstances extends Model<userroomstypes>, userroomstypes {}

const UserRooms = database.define<UserRoomsInstances>("UserRooms", {});

export default UserRooms;
