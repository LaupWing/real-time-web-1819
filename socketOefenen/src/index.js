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
const clients = []
io.on('connection', (socket)=>{

    // Disconnect and Connected Section
    console.log('a user connected', socket.id);
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });

    // First socket Event(Asking for the users Name)
    socket.on('set name', (setUserObj)=>{
        clients.push({
            socketid: socket.id,
            name: setUserObj.value, 
            offset: setUserObj.offset
        })   
        // clients[socket.id] = {name: setUserObj.value, offset: setUserObj.offset}
        // const userNames = Object.values(clients).map(user=>user.name)
        const userNames = clients.map(client=>client.name)
        socket.emit('set name', setUserObj.value)
        io.emit('users', userNames)
        console.log(`Current Clients here ${clients}`)
    })


    socket.on('chat message', (msgObj)=>{
        const user = clients.find(findId(socket.id, "socketid"))
        console.log(user.name+' message: ' + msgObj.value);
        const chatobj = {
            user    : user.name,
            msg     : encode(msgObj.value, msgObj.offset),
        }
        io.emit('chat message', chatobj);
    });
    

    socket.on('grant acces', (accesObj)=>{
        // console.log(accesObj)
        // console.log(clients)
        // const grantAccesTo = accesObj.acces
        //     .map(acces=>{
        //         console.log(clients)
        //         console.log(clients.filter(client=>client.name === acces))
        //         return clients.filter(client=>client.name === acces)
        //     })
        console.log(accesObj)
        // ASK WOOOOOTER this code below doesnt return a array in array but the code above does

        const offset = clients.filter(client=>client.name === accesObj.user)[0].offset
        
        const grantAccesTo = []
        accesObj.acces.forEach(acces=>{
            clients.forEach(client=>{
                if(acces === client.name){
                    grantAccesTo.push(client)
                }
            })
        })

        const decryptionObj = {
            offset,
            user: accesObj.user
        }

        grantAccesTo.forEach(acces=>{
            io.sockets.connected[acces.socketid].emit('granted acces', decryptionObj);
        })

        console.log(grantAccesTo)
        // const grantAccesTo = accesObj.acces
        //     .map(acces=>{
        //         return Object.entries(clients).map(array=>{
        //             console.log(array)
        //             if(acces === array[1].name){
        //                 console.log('array object: ',array)
        //                 return array
        //             }
        //         })
        //     })
    })
});

function encode (toEncode, offset) {
    return [...toEncode].map(letter => {
        return letter.charCodeAt(0) + Number(offset);
    }).map(charcode => {
        return String.fromCharCode(charcode);
    }).join("");
}

function findId(value, prop){
    return function (element){
        return element[prop] === value
    }
}

// http.listen(port, ()=>console.log(`Server is running on port ${port}`));