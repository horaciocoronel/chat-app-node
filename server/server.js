const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
// Port
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


// Middleware to use publicPath
app.use(express.static(publicPath));

// Routes
app.get('/', (req, res) => {
	res.render('index');
});

io.on('connection', (socket) => {
	console.log('New User connected');
	// socket.emit from Admin text welcome to the chat app
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined the conversation' ));

	// socket.broadcast.emit from Admin text New usr joined

	socket.on('createMessage', (message, callback) => {
			io.emit('newMessage', generateMessage(message.from, message.text));
			callback('This is from the server');
		});
		socket.on('createLocationMessage', (coords) => {
			io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`))
		});

		socket.on('disconnect', () => {
			console.log('User was disconnected');
		})
});


// Server Listens
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
