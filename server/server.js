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
	console.log('new user connected');
	socket.on('disconnect', () => {
		console.log('User was Disconnected')
	});
})


// Port
const port = process.env.PORT || 3000;

// Server Listens
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
