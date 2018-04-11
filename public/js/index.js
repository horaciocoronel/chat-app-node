// const $ = jQuery;
$(document).ready(function(){
    $("#toggle-button").click(function(){
        $("#toggle-data").slideToggle('slow');
    });
});

const socket = io();
socket.on('connect', () => {

});

socket.on('newMessage', (message) => {
	// console.log('New Message:', message);
	let li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	jQuery('#messages').append(li);
});

socket.on('newLocationMessage', (message) => {
	let li = jQuery('<li></li>');
	let a = jQuery('<a target="_blank">My current location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
	jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', (e) => {
	e.preventDefault();
	if(jQuery('[name=message]').val()) {
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val()
	}, () => {

	});
	}
	jQuery('[name=message]').val('');
});

const locationButton = jQuery('#send-location');
locationButton.on('click', (e) => {
		e.preventDefault();
	if (!navigator.geolocation) {
		console.log('Geolocation not supported by your browser');
		return alert('Geolocation not supported by your browser')
	}
	navigator.geolocation.getCurrentPosition((position) => {
		console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, () => {
		console.log('Unable to fetch location');
		return alert('Unable to fetch location')
	}),
	{enableHighAccuracy: true, maximumAge: 10000}
})
