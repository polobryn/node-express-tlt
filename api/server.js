const express = require('express');
const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({message: "Let everyone go to his private shelter"});
});

server.use('/api/lessons', restricted, lessonsRouter);
server.use('/api/messages', restricted, messagesRouter);

module.exports = server;