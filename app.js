const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/src/views/home.html');
});

const server = app.listen(3000, () => {
	console.log('listening on port 3000!');
});
//socket.io
const socket = require('socket.io');
const io = socket(server);

io.on('connection', (socket) => {
	console.log('a new user connected');
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('chat message', (data) => {
		io.emit('chat message', data);
	});
	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data);
	});
});
