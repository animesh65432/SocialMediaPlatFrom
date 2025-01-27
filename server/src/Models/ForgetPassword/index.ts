import database from "../../db";
import { Model, DataTypes } from "sequelize";
import { ForgstpasswordAttributes } from "../../types/models/Forgetpassword"

interface ForgetPasswordInstance
  extends Model<ForgstpasswordAttributes>,
  ForgstpasswordAttributes { }

const ForGetPassword = database.define<ForgetPasswordInstance>(
  "ForgetPassword",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }
);

export default ForGetPassword;
