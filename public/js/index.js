// const $ = jQuery;
$(document).ready(function(){
	console.log('Im ready');
    $("#toggle-button").click(function(){
        $("#toggle-data").slideToggle('slow');
    });
});

const socket = io();
socket.on('connect', () => {

});

socket.on('newMessage', (message) => {
	// console.log('New Message:', message);
	let li = jQuery('<li></li>')
	li.text(`${message.from}: ${message.text}`);
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
	e.preventDefault();
	// Working here
	if(jQuery('[name=message]').val()) {
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, () => {

	});
	}
	jQuery('[name=message]').val('')
});

const locationButton = jQuery('#send-location');
locationButton.on('click', (e) => {
		e.preventDefault();
	if (!navigator.geolocation) {
		return alert('Geolocation not supported by your browser')
	}
	navigator.geolocation.getCurrentPosition((position) => {
		console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}), () => {
		alert('Unable to fetch location')
	}
})
