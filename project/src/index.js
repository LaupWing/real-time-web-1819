const express = require('express');
const app = express();
// const http = require('http').Server(app);
const port = process.env.port || 4000;
const server = app.listen(port, ()=>console.log(`Server is running on port ${port}`))
// In the second parameter is the server you want to work with in this case
// it is the app server
const io = require('socket.io')(server);
   
app
    .use(express.static('static'));

// The variable io is gonna listen to a event called connection
// Every client has an instance of a socket that has been made
// so every client has a diffrent socket 
const array = io.sockets.clients()
io.on('connection', function(socket){
    console.log('a user connected', socket.id);
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
    // io.emit('some event', { for: 'everyone' });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });
    
    socket.on('set name', function(name){
        socket.emit('set name', name)
    })
    });

// http.listen(port, ()=>console.log(`Server is running on port ${port}`));