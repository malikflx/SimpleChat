// Make Connection
let socket = io.connect('http://localhost:5000');

// Select Chat Application Elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');
let name = document.getElementById('name');

// Emit Events
btn.addEventListener('click', function(){
  socket.emit('chat', {
    message: message.value,
    username: username.value
  });
  document.getElementById('message').value='';
  name.innerHTML = username.value;
});


message.addEventListener('keypress', function(){
  socket.emit('typing', username.value);
});

message.addEventListener('keyup', function(event){
  if (event.keyCode === 13){
    event.preventDefault();
    document.getElementById('send').click();
  }
});

//Listen for Events
socket.on('chat', function(data){
  feedback.innerHTML = "";
  output.innerHTML += '<p><stong>' + data.username + ':</strong> ' + data.message + '</p>';
});

socket.on('typing', function(data){
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});