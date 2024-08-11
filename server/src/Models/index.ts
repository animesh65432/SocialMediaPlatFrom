import Users from "./Users";
import ForgetPassword from "./ForgetPassword";
import Posts from "./Posts";
import Room from "./Rooms";
import UserRooms from "./UsersRooms";

Users.hasMany(ForgetPassword);
ForgetPassword.belongsTo(Users);
Users.hasMany(Posts);
Posts.belongsTo(Users);
Users.belongsToMany(Room, {
  through: UserRooms,
  foreignKey: "userid",
  otherKey: "roomid",
});

Room.belongsToMany(Users, {
  through: UserRooms,
  foreignKey: "roomid",
  otherKey: "userid",
});
export { Users, ForgetPassword, Posts, UserRooms, Room };
