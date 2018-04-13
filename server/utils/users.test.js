const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
	let users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: 1,
			name: 'Horacio',
			room: 'Node Course'
		},
		{
			id: 2,
			name: 'Peter',
			room: 'Angular Course'
		},
		{
			id: 3,
			name: 'Mike',
			room: 'Node Course'
		}];
	})

		it('should add new user', () => {
			let newUsers = new Users();
			let user = {
				id: 123,
				name: 'Horacio',
				room: 'The office Fans'
			};
			let resUser = newUsers.addUser(user.id, user.name, user.room)

			expect(newUsers.users).toEqual([user]);
		});

		it('should remove a user', () => {
			let userId = 1;
			let user = users.removeUser(userId);

			expect(user.id).toBe(userId);
			expect(users.users.length).toBe(2);
		});

		it('should not remove a user', () => {
			let userId = 99;
			let user = users.removeUser(userId);

			expect(user).toBe(undefined);
			expect(user).toBeFalsy();
			expect(users.users.length).toBe(3);
		});

		it('should find user', () => {
			let userId = 2;
			let user = users.getUser(userId);

			expect(user.id).toBe(userId);
		});

		it('should not find user', () => {
			let userId = 99;
			let user = users.getUser(userId);

			expect(user).toBe(undefined);
			expect(user).toBeFalsy();
		})

		it('should return names for node courses', () => {
			let userList = users.getUserList('Node Course');
			expect(userList).toEqual(['Horacio', 'Mike']);
		});

		it('should return names for react courses', () => {
			let userList = users.getUserList('Angular Course');
			expect(userList).toEqual(['Peter']);
		});
});
