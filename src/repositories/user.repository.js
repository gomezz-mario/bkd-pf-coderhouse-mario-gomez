import UserDao from "../dao/user.dao.js";
import { User } from "../dao/factory.js";

export const UserService = new UserDao(new User());