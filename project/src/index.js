const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.port || 4000;
const router = require('./router/routes');
const io = require('socket.io')(http);
   
app
    .set('views', 'view')
    .set('view engine', 'ejs')
    .use(router)
    .use(express.static('static'));

io.on('connection', function(socket){
    console.log('a user connected');
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
    });

http.listen(port, ()=>console.log(`Server is running on port ${port}`));