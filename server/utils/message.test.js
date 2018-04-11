const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		let from = 'Horacio';
		let text = 'Testing tests';
		let message = generateMessage(from, text);

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({ from, text});
	})
})

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		let from = 'Admin';
		let latitude = 43.6579965;
		let longitude = -78.8311674;
		let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
		let message = generateLocationMessage(from, latitude, longitude )

		expect(typeof message.createdAt).toBe('number');
		expect(message).toMatchObject({ from, url });

	})
});
