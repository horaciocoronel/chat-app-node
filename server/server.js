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

	socket.on('createMessage', (message) => {
			console.log('message', {
				to: message.to,
				text: message.text,
				createdAt: Date.now()
			});
			io.emit('newMessage', {
				from: message.from,
				text: message.text,
				createdAt: new Date().getTime()
			})
		});
});

// Port
const port = process.env.PORT || 3000;

// Server Listens
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
