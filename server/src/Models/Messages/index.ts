import { DataTypes, Model } from "sequelize";
import database from "../../db";

interface MessageAttributes {
  id?: number;
  text: string;
  senderId?: number;
  receiverId?: number;
}

interface MessageInstance extends Model<MessageAttributes>, MessageAttributes {}

const Messages = database.define<MessageInstance>("Messages", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Messages;
