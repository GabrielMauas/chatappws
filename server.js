const { SSL_OP_NO_TICKET } = require('constants');
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('User conected, host: ', socket.handshake.headers.host);
    socket.on('disconnect', () => {
        console.log('User disconnected, id: ', socket.handshake.headers.host);
    });
});

io.on('connection', socket => {
    socket.on('chat message', msg => {
        io.emit('chat message', {mens: msg, data: socket.id});
    });
})

const port = process.ENV.PORT || 4000;
server.listen(port, () => {
    console.log('Server is running...');
});








