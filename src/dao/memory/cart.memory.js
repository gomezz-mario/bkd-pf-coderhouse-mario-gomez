class CartMemory{
	
	constructor(){
		this.carts = [];
		this.nextId = 0;
	}

	createCart = async() => {
		const newCart = {
			id: this.nextId,
			products: []
		}
		this.carts.push(newCart);
		this.nextId++;
		return newCart.id;
	};
	getCartById = async (cartId) => {
		return this.carts.find(cart => cart.id === cartId);
	};
	updateProductsOnCart = async (cartId, updateProducts) => {
		const cart = this.carts.find(cart => cart.id === cartId);
		if(!cart) return null;
		updateProducts.map(updateProduct => {
			const product = cart.products.find(productOnCart => productOnCart.id === updateProduct.id);
			if(!product){
				cart.push(updateProduct);
			} else{
				product.quantity = updateProduct.quantity;
			}
		});
		return cart.id;
	};
	deleteAllProductsToCart = async (cartId) => {
		const cart = this.carts.find(cart => cart.id === cartId);
		if(!cart) return null;
		cart.products = [];
		return cart.id;
	};
	deleteCart = async(cartId) => {
		const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
		if(cartIndex < 0) return null;
		this.carts.splice(cartIndex, 1);
		return cartId;
	};
}

export default CartMemory;