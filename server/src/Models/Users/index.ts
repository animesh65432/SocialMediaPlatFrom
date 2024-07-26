import { DataTypes, Model, Optional } from "sequelize";
import database from "../../db";

export interface UserAttributes {
  Id: number;
  Name: string;
  Email: string;
  Password: string;
  PhotoUrl: string;
  Gender?: "Male" | "Female";
  followers?: number;
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
    allowNull: false,
    defaultValue:
      "https://th.bing.com/th/id/OIP.ADA-vGQMw0K3Bzbn9ZOhPgHaE8?rs=1&pid=ImgDetMain",
  },
  Gender: {
    type: DataTypes.ENUM("Male", "Female"),
    allowNull: true,
  },
  followers: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

export default Users;
