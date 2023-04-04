import TicketModel from "./models/tickets.model.js";
import Connect from "./connect.mongo.js";

class TicketMongo{
	constructor(){
		Connect.getInstance();
	}

	createTicket = async (purchaser, code, products, amount) => {
		return await TicketModel.create({
			purchaser,
			code,
			products,
			amount
		})
	}

}

export default TicketMongo;