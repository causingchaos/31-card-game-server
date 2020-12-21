const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
let player = [];

io.on('connect', function (socket) {
  console.log(`A user connected: ${socket.id}`);

  player.push(socket.id);
  io.emit('playerConnected', socket.id);

  if (player.length === 1) {
    io.emit('isPlayerA');
  }

  socket.on('dealCards', function() {
    io.emit('dealCards');
    console.log(`The number of players: ${players.length}`);
  });

  socket.on('cardPlayed', function (gameObject, isPlayerA) {
    io.emit('cardPlayed', gameObject, isPlayerA);
  }); 
  
  socket.on('disconnect', function () {
    console.log(`A user disconnected: ${socket.id}`);
    players = players.filter( player => player !== socket.id);
  });
});

server.listen(port, function () {
  console.log(`Server started on port ${port}`)
});