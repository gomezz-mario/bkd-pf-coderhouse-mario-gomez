class UserMemory{
	constructor(){
		this.users = [];
		this.nextId = 0;
	}
	createUser = (userData) => {
		const newUser = {
			id: this.nextId,
			...userData
		}
		this.users.push(newUser);
		this.nextId++;
		return newUser.id;
	};
	getUserByEmail = (userEmail) => {
		const user = this.users.find(user => user.email === userEmail);
		if(!user) return null;
		return user;
	};
	updateUserById = (userId, userData) => {
		const user = this.users.find(user => user.id === userId);
		if(!user) return null;
		const userDataArray = Object.entries(userData);
		userDataArray.map(data => {
			user[data[0]] = data[1];
		});
		return user.id;
	};
	deleteUserById = (userId) => {
		const userIndex = this.users.findIndex(user => user.id === userId);
		if(userIndex < 0) return null;
		this.users.splice(userIndex, 1);
		return userId;
	};
}

export default UserMemory;