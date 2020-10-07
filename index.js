let express = require('express');
let socket = require('socket.io');

// Application Setup
let app = express();
let server = app.listen(5000, function(){
  console.log('listening on port 5000');
});

//Static files
app.use(express.static('public'));

//Socket setup
let io = socket(server);

io.on('connection', function(socket){
  console.log('connection to socket has been made.', socket.id);
  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data)
  });
});