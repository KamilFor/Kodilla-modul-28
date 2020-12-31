const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'client')));

const messages = [];
const users = [];

function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}
// Kodilla moglaby lepiej przygotowywac komentarze ;)
// Connection on socket
io.on('connection', (socket) => {
  // Join Socket
  socket.on('joinRoom', (username) => {
    socket.broadcast.emit('message', { author: 'Bot', content: 'User join channel' });
    // User add to array
    users.push({ username, id: socket.id });
    console.log(users);
    // Socket Message listener
    socket.on('message', (message) => {
      messages.push(message);
      socket.broadcast.emit('message', message);
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('message', { author: 'Bot', content: 'User left channel' });

    // W tej funkcji jest coś źle ale nie do końca wiem co
    users.filter((user) => {
      user.id !== socket.id;
    });
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
