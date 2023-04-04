import passport from 'passport';
import passportLocal from 'passport-local';
import { UserService } from '../../repositories/user.repository.js';
import { createHash, isValidPassword } from "../../utils.bcrypt.js";

const LocalStrategy = passportLocal.Strategy;

const inicializeLocalStrategies = () => {
	passport.use('login-local', new LocalStrategy(
		{ usernameField: 'email' },
		async(username, password, done) => {
			try {
				const user = await UserService.getUserByEmailAndSocial(username, 'local');
				if(!user) return done(null, false);
				if(!isValidPassword(user, password)) return done(null, false);
				return done(null, user);
			} catch (error) {
				return done({error: `Error login-local strategy. ${error}`});
			}
		}
	));

	passport.use('register-local', new LocalStrategy(
		{passReqToCallback: true, usernameField: 'email'},
		async(req, username, password, done) => {
			try {
				const userDB = await UserService.getUserByEmailAndSocial(username, 'local');
				if(userDB) return done(null, false);
				const userData = req.body;
				userData.password = createHash(password);
				const user = await UserService.addUser(userData);
				return done(null, user);
			} catch (error) {
				return done({error: `Error en register-local strategy. ${error}`});
			}
		}	
	))
}

export default inicializeLocalStrategies;