import passport from "passport";
import { UserService } from "../repositories/user.repository.js";
import inicializeLocalStrategies from "./strategies/local.strategy.js";

const initializePassport = () => {

	inicializeLocalStrategies();

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser( async(id, done) => {
		const user = await UserService.getUserById(id);
		done(null, user);
	});
}

export default initializePassport;