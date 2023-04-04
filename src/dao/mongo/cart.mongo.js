import Connect from "./connect.mongo.js";
import CartModel from "./models/cart.model.js";

class CartMongo{
	constructor(){
		Connect.getInstance();
	}

	createCart = async() => {
		const newCart = await CartModel.create({products: []});
		return newCart.id;
	};
	getCartById = async (cartId) => {
		return await CartModel.findById(cartId);
	};
	updateProductsOnCart = async (cartId, updateProducts) => {
		//verificar que se produzcan los cambios en la base de datos...
		const cart = await CartModel.findById(cartId);
		if(!cart) return null;
		updateProducts.map(updateProduct => {
			const product = cart.products.find(productOnCart => productOnCart.id === updateProduct.id);
			if(!product){
				cart.products.push(updateProduct);
			} else{
				product.quantity = updateProduct.quantity;
			}
		});
		return cart.id;
	};
	deleteAllProductsToCart = async (cartId) => {
		const result = await CartModel.findByIdAndUpdate(cartId, {products: []});
		console.log(result);
		if(!result) return null;
		return cartId;
	};
	deleteCart = async(cartId) => {
		const result = await CartModel.findByIdAndDelete(cartId);
		console.log(result);
		if(!result) return null;
		return cartId;
	};
}

export default CartMongo;