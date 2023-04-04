import { Cart } from "../dao/factory.js";
import CartDao from "../dao/cart.dao.js";

export const CartService = new CartDao(new Cart());