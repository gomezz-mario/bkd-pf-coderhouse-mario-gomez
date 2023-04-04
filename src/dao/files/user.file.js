import fs from "fs";

class UserFile{
	constructor(){
		this.filename = "./users.json";
	}
	readUserFile = () => {
		if(fs.existsSync(this.filename)){
			const data = fs.readFileSync(this.filename, 'utf-8');
            const jsondata = JSON.parse(data);
			return jsondata;
		}
		return null;
	};
	saveUserFile = (nextId, users) => {
		fs.writeFileSync(this.filename, JSON.stringify({
			nextId,
			users
		}));
	};
	createUser = async (userData) => {
		const jsondata = this.readUserFile();
		if(!jsondata) return null;
		const newUser = {
			id: jsondata.nextId,
			...userData
		};
		jsondata.users.push(newUser);
		this.saveUserFile(jsondata.nextId + 1, jsondata.users);
		return newUser.id; 
	};
	getUserByEmail = (userEmail) => {
		const jsondata = this.readUserFile();
		if(!jsondata) return null;
		const user = jsondata.users.find(user => user.email === userEmail);
		if(!user) return null;
		return user;
	};
	updateUserById = (userId, userData) => {
		const jsondata = this.readUserFile();
		if(!jsondata) return null;
		const user = jsondata.users.find(user => user.id === userId);
		if(!user) return null;
		const userDataArray = Object.entries(userData);
		userDataArray.map(data => {
			user[data[0]] = data[1];
		});
		this.saveUserFile(jsondata.nextId, jsondata.users);
		return userId;
	};
	deleteUserById = (userId) => {
		const jsondata = this.readUserFile();
		if(!jsondata) return null;
		const userIndex = this.jsondata.users.findIndex(user => user.id === userId);
		if(userIndex < 0) return null;
		jsondata.users.splice(userIndex, 1);
		this.saveUserFile(jsondata.nextId, jsondata.users);
		return userId;
	};
}

export default UserFile;
