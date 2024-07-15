import { DataTypes, Model, Optional } from "sequelize";
import database from "../../db";

export interface UserAttributes {
  Id: number;
  Name: string;
  Email: string;
  Password: string;
  PhotoUrl?: string;
  Gender?: "Male" | "Female";
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
  PhotoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
  Gender: {
    type: DataTypes.ENUM("Male", "Female"),
    allowNull: true,
  },
});

export default Users;
