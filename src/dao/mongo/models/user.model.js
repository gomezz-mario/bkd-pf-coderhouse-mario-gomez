import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	full_name: String,
	username: String,
	password: String,
	birthdate: Date,
	email: String,
	role: String,
	social: String
});
export default mongoose.model("carts", CartSchema);