// [{
// 	id: 'assaq22121',
// 	name: 'Horacio',
// 	room: 'The office room'
// }]

// addUser(id, name, room)
//removeUser(id)
//getUser(id)
// getUserList(room)

class Users {
	constructor() {
		this.users = [];
	}
	addUser(id, name, room) {
		let user = {id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser(id) {
		// return user that was removed
		let user = this.getUser(id);
		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
		}
		return user;
	}
	getUser(id) {
		return this.users.filter((user) => user.id === id)[0]
	}
	getUserList(room) {
		let users = this.users.filter((user) => user.room === room);
		let namesArray = users.map((user) => user.name);
		return namesArray;
	}
}

let newUser = new Users();

newUser.addUser('Admin', 'name', 'room');



// class Person {
// 	constructor(name) {
// 		this.name = name;
// 	}
// 	getUserDescription () {
// 		return `Hi I'm ${this.name}`
// 	}
// }
//
// let newPerson = new Person('Horacio');
//
// console.log(newPerson.name);
// let description = newPerson.getUserDescription();
// console.log(description);


module.exports = {Users};
