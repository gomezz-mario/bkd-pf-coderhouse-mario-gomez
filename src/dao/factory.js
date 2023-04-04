import { persistence } from "../config.js";

export let Product;
export let Cart;
export let User;
export let Ticket;

switch (persistence) {
    case 'MONGO':
        console.log('Persistence: MONGO');
        const { default: ProductMongo } = await import('./mongo/product.mongo.js')
        Product = ProductMongo;
        const { default: CartMongo } = await import('./mongo/cart.mongo.js')
        Cart = CartMongo;
        const { default: UserMongo } = await import('./mongo/user.mongo.js')
        User = UserMongo;
        const { default: TicketMongo } = await import('./mongo/tickets.mongo.js');
        Ticket = TicketMongo;
        break;
    case 'FILE':
        console.log('Persistence: FILE');
        const { default: ProductFile } = await import('./files/product.file.js')
        Product = ProductFile;
        const { default: CartFile } = await import('./files/cart.file.js');
        Cart = CartFile;
        const { default: UserFile } = await import('./files/user.file.js')
        User = UserFile;

        const { default: TicketFile } = await import('./mongo/tickets.mongo.js');
        Ticket = TicketFile;
        break;
    default:
        console.log('Persistence: MEMORY');
        const { default: ProductMemory } = await import('./memory/product.memory.js')
        Product = ProductMemory;
        const { default: CartMemory } = await import('./memory/cart.memory.js');
        Cart = CartMemory;
        const { default: UserMemory } = await import('./memory/user.memory.js')
        User = UserMemory;
        const { default: TicketMemory } = await import('./mongo/tickets.mongo.js');
        Ticket = TicketMemory;
        break;
}   