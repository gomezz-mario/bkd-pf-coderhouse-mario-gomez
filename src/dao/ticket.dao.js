import { Ticket } from "./factory.js";

class TicketDao{
	constructor(){
		this.ticket = new Ticket();
	}
	createTicket = async (user, products) => {
		const amount = products.reduce((acum, product) => acum + product.price*product.quantity, 0);
		const purchaser = user.email;
		const code = 0; //generar codigo unico
		return await this.ticket.createTicket(purchaser, code, products, amount);
	};
}

export default TicketDao;