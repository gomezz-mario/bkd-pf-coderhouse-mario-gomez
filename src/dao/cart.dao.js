class CartDao{
	constructor(cartDao){
		this.cartDao = cartDao;
	}
	createCart = async() => {
		return await this.cartDao.createCart();
	};
	getCartById = async (cartId) => {
		return await this.cartDao.getCartById(cartId)
	};
	updateProductsOnCart = async (cartId, productsOnCart) => {
		return await this.cartDao.updateProductsOnCart(cartId, productsOnCart);
	};
	deleteAllProductsToCart = async (cartId) => {
		return await this.cartDao.deleteAllProductsToCart(cartId);
	};
	deleteCart = async(cartId) => {
		return await this.cartDao.deleteCart(cartId);
	};
}

export default CartDao;