const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const port = 8000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname,"../public");

// app.use(express.static(publicDirectoryPath));
app.use('/chat',express.static(publicDirectoryPath));

server.listen(port,() => {
    console.log(`Server is up on port: ${port}`);
});
let count = 0;
io.on('connection',(socket)=>{
    console.log('New websocket connection');
    //Current Connection
    socket.emit('message','Welcome');
    //For all connection except current connection
    socket.broadcast.emit('message','A New user has joined');
    //Send Message function
    socket.on('sendMessage',(message)=>{
        //to all connection
        io.emit('message',message);
    });
    //Runned when user closed the window and socket is disconnected
    socket.on('disconnect',()=>{
        io.emit('message',"User left the chat");
    });

    socket.on('sendLocation',(coords) => {
        socket.broadcast.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
    })
});
