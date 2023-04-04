import Connect from "./connect.mongo.js";
import UserModel from "./models/user.model.js";

class UserMongo{
	constructor(){
		Connect.getInstance();
	}
	createUser = async (userData) => {
		const newUser = await UserModel.create(userData);
		return newUser.id;
	};
	getUserByEmail = async (userEmail) => {
		return await UserModel.findOne({mail: userEmail});
	};
	updateUserById = async (userId, userData) => {
		return await UserModel.findByIdAndUpdate(userId, userData);
	};
	deleteUserById = async (userId) => {
		await UserModel.findByIdAndDelete(userId);
		return userId;
	};
}

export default UserMongo;