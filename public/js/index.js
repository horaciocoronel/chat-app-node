// const socket = io();
// socket.on('connect', () => {
// 	console.log('Connected to server');
//
// 	socket.emit('createEmail', {
// 		to: 'info@info.net',
// 		body: 'test'
// 	})
// });
// socket.on('disconnect', () => {
// 	console.log('Disconnected from the server');
// });
//
// socket.on('newEmail', (email) => {
// 	console.log('New email', email);
// })

const socket = io();
socket.on('connect', () => {

});

socket.on('newMessage', (message) => {
	console.log('New Message:', message);
});
