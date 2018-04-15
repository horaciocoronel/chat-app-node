$(document).ready(function(){
    $("#toggle-button").click(function(){
        $("#toggle-data").slideToggle('slow');
    });
});

const socket = io();

scrollToBottom = () => {
	let messages = jQuery('#messages-board');
	let newMessage = messages.children('ol');

	let clientHeight = messages.prop('clientHeight');
	let scrollTop = messages.prop('scrollTop');
	let scrollHeight = messages.prop('scrollHeight');
	let newMessageHeight = newMessage.innerHeight();
	let lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', () => {
	let params = jQuery.deparam(window.location.search);
	socket.emit('join', params, (err) => {
		if (err) {
			alert(err)
			window.location.href = '/'
		} else {
			console.log('No error');
		}
	});
});

socket.on('disconnect', () => {
	console.log('Disconnected from server');
});

socket.on('updateUserList', (users) => {
	let ol = jQuery('<ol></ol>');

	users.forEach((user) => {

		ol.append(jQuery('<li></li>').text(user));
	})

	jQuery('#users').html(ol);

})

socket.on('newMessage', (message) => {
	let formattedTime = moment(message.createdAt).format('h:mm a');
	let template = jQuery('#message-template').html();
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});
	jQuery('#messages').append(html);
	scrollToBottom();
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
	scrollToBottom();
});


jQuery('#message-form').on('submit', (e) => {
	e.preventDefault();
	let messageTextbox = jQuery('[name=message]');
	if(jQuery('[name=message]').val()) {
	socket.emit('createMessage', {
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
