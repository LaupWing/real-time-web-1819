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
// let clients = []
let clients ={}
io.on('connection', (socket)=>{
    console.log('a user connected', socket.id);
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
    socket.on('chat message', (msg)=>{
        console.log(clients[socket.id].name+' message: ' + msg);
        const chatobj = {
            user: clients[socket.id].name,
            msg
        }
        io.emit('chat message', chatobj);
    });
    
    socket.on('set name', (name)=>{
        // clients.push({
            //     id: socket.id, 
            //     name
            // })
        clients[socket.id] = {name}
        
        console.log(Object.entries(clients)[0][1].name)
        console.log(clients)
        socket.emit('set name', name)
    })
    });

// http.listen(port, ()=>console.log(`Server is running on port ${port}`));