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
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
});

socket.on('newLocationMessage', (message) => {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#location-message-template').html();
	let html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: message.formattedTime
	});
	jQuery('#messages').append(html);
});


jQuery('#message-form').on('submit', (e) => {
	e.preventDefault();
	let messageTextbox = jQuery('[name=message]');
	if(jQuery('[name=message]').val()) {
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val()
	}, () => {
		messageTextbox.val('');
	});
}
});

const locationButton = jQuery('#send-location');
locationButton.on('click', (e) => {
		e.preventDefault();
	if (!navigator.geolocation) {
		console.log('Geolocation not supported by your browser');
		return alert('Geolocation not supported by your browser')
	}
	locationButton.attr('disabled', 'disabled');
	navigator.geolocation.getCurrentPosition((position) => {
		locationButton.removeAttr('disabled');
		console.log(position);
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, () => {
		locationButton.removeAttr('disabled');
		return alert('Unable to fetch location')
	}),
	{enableHighAccuracy: true, maximumAge: 10000}
})
