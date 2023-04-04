import { Ticket } from "../dao/factory.js";
import TicketDao from "../dao/ticket.dao.js";

export const TicketService = new TicketDao(new Ticket());