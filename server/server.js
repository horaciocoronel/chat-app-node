const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '../public');

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
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome to the chat app',

	})
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'A new user joined the conversation'
	})

	// socket.broadcast.emit from Admin text New usr joined

	socket.on('createMessage', (message) => {
			io.emit('newMessage', {
				from: message.from,
				text: message.text,
				createdAt: new Date().getTime()
			});
			// socket.broadcast.emit('newMessage', {
			// 		from: message.from,
			// 		text: message.text,
			// 		createdAt: new Date().getTime()
			// });
		});

		socket.on('disconnect', () => {
			console.log('User was disconnected');
		})
});

// Port
const port = process.env.PORT || 3000;

// Server Listens
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
