import config from './Config';
import express from 'express';
import database from './db';
import http from 'http';
import {
  UserRouter,
  forgetPasswordrouter,
  PostRouter,
  profilerouter,
  RoomRouter,
} from './router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import { roomHandler } from './roomhandler';
import job from './corn';
import { Createdummyuser } from './utils';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  roomHandler(socket);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/users', UserRouter);
app.use('/forget', forgetPasswordrouter);
app.use('/post', PostRouter);
app.use('/profile', profilerouter);
app.use('/Room', RoomRouter);

job.start();

database
  .sync({ force: true })
  .then(async () => {
    await Createdummyuser({
      Name: 'testname',
      Email: 'test@gmail.com',
      Password: 'testPassword',
    });
    server.listen(config.PORT || 4000, () => {
      console.log(`Server started at port ${config.PORT || 4000}`);
    });
  })
  .catch((errors) => {
    console.error('Database sync error:', errors);
  });
