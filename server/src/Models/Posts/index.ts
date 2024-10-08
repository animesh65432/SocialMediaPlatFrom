import { DataTypes, Model } from "sequelize";
import database from "../../db";

interface PostAttributes {
  id?: number;
  img?: string;
  title?: string;
  comment?: string;
  UserId?: number;
  video?: string;
  userPhotoUrl: string;
  userName: string;
}

interface PostdInstance extends Model<PostAttributes>, PostAttributes {}

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
    userPhotoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true }
);

export default Posts;
