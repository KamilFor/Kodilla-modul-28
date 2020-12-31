const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

const messages = [];

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
