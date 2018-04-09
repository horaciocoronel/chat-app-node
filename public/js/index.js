const socket = io();
socket.on('connect', () => {

});

socket.on('newMessage', (message) => {
	console.log('New Message:', message);
});
