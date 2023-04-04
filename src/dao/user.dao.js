class UserDao{
	constructor(userDao){
		this.userDao = userDao;
	}
	createUser = async (userData) => {
		return await this.userDao.createUser(userData);
	};
	getUserByEmail = async (userEmail) => {
		return await this.userDao.getUserByEmail(userEmail);
	};
	updateUserById = async (userId, userData) => {
		return await this.userDao.updateUserById(userId, userData);
	};
	deleteUserById = async (userId) => {
		return await this.userDao.deleteUserById(userId);
	};
}

export default UserDao;