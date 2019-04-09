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
    });

http.listen(port, ()=>console.log(`Server is running on port ${port}`));