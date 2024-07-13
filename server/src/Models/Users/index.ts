import { DataTypes, Model, Optional } from "sequelize";
import database from "../../db";

interface UserAttributes {
  Id: number;
  Name: string;
  Email: string;
  Password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "Id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const Users = database.define<UserInstance>("Users", {
  Id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Users;
