require('dotenv').config();
const express = require('express');
const cors = require('cors');
const UserModel = require('./models/User');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const app = express();
const http = require('http').createServer(app);
const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);
app.use(express.static('uploads'));
app.use(express.json());
app.use(router);
socketIO.on('connection', async (socket) => {
  console.log('connected');
  socket.on('USER:ONLINE-TRUE', async (data) => {
    console.log(data.userId + '  ' + 'online true');
    if (data.userId) {
      console.log('online');
      await UserModel.findByIdAndUpdate(data.userId, { isOnline: true });
    }
  });
  socket.on('USER:ONLINE-FALSE', async (data) => {
    console.log(data.userId + '  ' + 'online true');
    if (data.userId) {
      console.log('not online');
      await UserModel.findByIdAndUpdate(data.userId, { isOnline: false });
    }
  });

  socket.on('MESSAGE:GET', async (data) => {
    socket.broadcast.emit('MESSAGE:SEND', { ...data, isMe: false });
  });
  // socket.on('disconnect', async (resason) => {
  //   console.log('dis');
  //   socket.emit('USER:DISCONNECTED', {});
  // });
});
const PORT = process.env.PORT || 5555;

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    http.listen(PORT, () => {
      console.log('Server listen');
    });
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });
