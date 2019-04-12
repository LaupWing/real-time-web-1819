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
let clients = {}
io.on('connection', (socket)=>{
    console.log('a user connected', socket.id);
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
    socket.on('chat message', (msgObj)=>{
        console.log(clients[socket.id].name+' message: ' + msgObj.value);
        const chatobj = {
            user    : clients[socket.id].name,
            msg     : encode(msgObj.value, msgObj.offset),
        }
        io.emit('chat message', chatobj);
    });
    
    socket.on('set name', (setUserObj)=>{
            // clients.push({
            //     id: socket.id, 
            //     name
            // })
        clients[socket.id] = {name: setUserObj.value, offset: setUserObj.offset}
        const userNames = Object.values(clients).map(user=>user.name)
        socket.emit('set name', setUserObj.value)
        io.emit('users', userNames)
        console.log(clients)
    })

    socket.on('grant acces', (accesObj)=>{
        console.log(clients)
        console.log(Object.entries(clients))
        console.log(accesObj.acces)
        const grantAccesTo = accesObj.acces
            .map(acces=>{
                return Object.entries(clients).map(array=>{
                    console.log(array)
                    if(acces === array[1].name){
                        console.log('array object: ',array)
                        return array
                    }
                })
            })
        console.log(grantAccesTo[0][0][1])
    })
});

function encode (toEncode, offset) {
    return [...toEncode].map(letter => {
        return letter.charCodeAt(0) + Number(offset);
    }).map(charcode => {
        return String.fromCharCode(charcode);
    }).join("");
}

function decode (toDecode, offset) {
    return [...toDecode].map(letter => {
        return String.fromCharCode(letter.charCodeAt(0) - Number(offset));
    }).join("");
}

// http.listen(port, ()=>console.log(`Server is running on port ${port}`));