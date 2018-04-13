const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
// Port
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();


// Middleware to use publicPath
app.use(express.static(publicPath));

// Routes
app.get('/', (req, res) => {
	res.render('index');
});

io.on('connection', (socket) => {
	console.log('New User connected');
	// socket.emit from Admin text welcome to the chat app
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || (!isRealString(params.room))) {
			return callback('Name and room name are required');
		}
		socket.join(params.room);
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
		//socket.leave('The Office Fans');

		// io.emit to every user connected  equalst to -> io.to('the office fans').emit
		// socket.broadcast.emit to evey user connected to the socket except the current user equalst to -> socket.broadcast.to('the office fans').emit
		//socket.emit event to one user
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined` ));
		callback()
	})


	// socket.broadcast.emit from Admin text New usr joined

	socket.on('createMessage', (message, callback) => {
			io.emit('newMessage', generateMessage(message.from, message.text));
			callback();
		});
		socket.on('createLocationMessage', (coords) => {
			io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
		});

		socket.on('disconnect', () => {
			let user = users.removeUser(socket.id);
			if (user) {
				io.to(user.room).emit('updateUserList', users.getUserList(user.room));
				io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
			}
		});
});


// Server Listens
server.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
