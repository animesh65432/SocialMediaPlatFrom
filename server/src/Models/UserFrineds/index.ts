import database from "../../db";
import { Model, DataTypes } from "sequelize";

interface UsersFriendTypes {
  id?: number;
  FrinedId?: number;
  UserId?: number;
}

interface UserFriendInstance
  extends Model<UsersFriendTypes>,
    UsersFriendTypes {}
const UserFriends = database.define<UserFriendInstance>("UserFrineds", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

export default UserFriends;
