const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
  cors: {
    origin: ['http://localhost:4200','https://ons-tnhx.onrender.com', 'https://onsteam-4be44.web.app/','https://onsprocessoseletivo.web.app'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'UPDATE', 'OPTIONS'],
    credentials: true,
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('setPoints', (message) => {
    io.emit('setPoints', message);
  });

  socket.on('setPlayers', (message) => {
    io.emit('setPlayers', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3001, () => {
  console.log('Listening on port 3001');
});
