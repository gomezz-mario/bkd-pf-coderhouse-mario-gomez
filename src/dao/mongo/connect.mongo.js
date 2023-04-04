import mongoose from "mongoose";
import { mongoUrl } from "../../config.js";

class ConnectMongo{
	static #instance;
	constructor(){
		mongoose.connect(mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true});
	};
	static getInstance = () => {
		if(this.#instance){
			console.log('Already connected!');
			return this.#instance;
		}
		this.#instance = new ConnectMongo();
		console.log('Connected!');
		return this.#instance;
	}
}

export default ConnectMongo;