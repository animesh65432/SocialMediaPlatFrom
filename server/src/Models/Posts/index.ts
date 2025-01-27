import { DataTypes, Model } from "sequelize";
import database from "../../db";
import { PostAttributes } from "../../types/models/Post"

interface PostdInstance extends Model<PostAttributes>, PostAttributes { }

const Posts = database.define<PostdInstance>(
  "Posts",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "Id"
      }
    }
  },
  { timestamps: true }
);

export default Posts;
