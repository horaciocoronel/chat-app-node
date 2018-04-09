const socket = io();
socket.on('connect', () => {

});

socket.on('newMessage', (message) => {
	console.log('New Message:', message);
	let li = jQuery('<li></li>')
	li.text(`${message.from}: ${message.text}`);
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, () => {

	})
	jQuery('[name=message]').val('')
});
