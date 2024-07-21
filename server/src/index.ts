import config from "./Config";
import express from "express";
import database from "./db";
import http from "http";
import {
  UserRouter,
  forgetPasswordrouter,
  PostRouter,
  friendsrouter,
  MessagesRouter,
} from "./router";
import cookieParser from "cookie-parser";
import { Users, ForgetPassword, Posts, UserFriends, Messages } from "./Models";
import cors from "cors";
import { Server } from "socket.io";
import jsonwebtoken from "jsonwebtoken";
import { JwtPayload } from "./middlewares";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UserRouter);
app.use("/forget", forgetPasswordrouter);
app.use("/post", PostRouter);
app.use("/friends", friendsrouter);
app.use("/Messages", MessagesRouter);

Users.hasMany(ForgetPassword);
ForgetPassword.belongsTo(Users);
Users.hasMany(Posts);
Posts.belongsTo(Users);
Users.belongsToMany(Users, { through: UserFriends, as: "Friends" });
Messages.belongsTo(Users, { as: "sender", foreignKey: "senderId" });
Messages.belongsTo(Users, { as: "receiver", foreignKey: "receiverId" });

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("Getmessage", async (token) => {
    console.log("Received token:", token);
    if (!token) {
      socket.emit("please provide token");
      return;
    }
    try {
      const { Email } = jsonwebtoken.verify(
        token,
        config.JSONWEBSECRECT as string
      ) as JwtPayload;
      console.log( "Users Emial",Email)

      const user = await Users.findOne({
        where: {
          Email,
        },
      });

      console.log("finding the user",user)

      if (!user) {
        console.log("error", "User not found")
        socket.emit("error", "User not found");
        return;
      }

      const messages = await Messages.findAll({
        where: {
          receiverId: user.Id,
        },
      });

      console.log(messages)

      socket.emit("messages", messages);
    } catch (error) {
      console.error("Error in Getmessage:", error);
      socket.disconnect();
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

database
  .sync()
  .then(() => {
    server.listen(config.PORT || 4000, () => {
      console.log(`Server started at port ${config.PORT || 4000}`);
    });
  })
  .catch((errors) => {
    console.error("Database sync error:", errors);
  });
