class CartFile{
	constructor(){
		this.filename = "./carts.json";
	}
	readCartFile = () => {
		if(fs.existsSync(this.filename)){
			const data = fs.readFileSync(this.filename, 'utf-8');
            const jsondata = JSON.parse(data);
			return jsondata;
		}
		return null;
	}
	saveCartFile = (nextId, carts) => {
		fs.writeFileSync(this.filename, JSON.stringify({
			nextId,
			carts
		}));
	}
	createCart = async() => {
		const jsondata = this.readCartFile();
		const newId = jsondata ? jsondata.nextId : 0;
		const carts = jsondata ? jsondata.carts : [];
		const newCart = {};
		carts.push({
			id: newId,
			products: newCart
		});
		this.saveCartFile(newId + 1, carts);
		return newId;

	};
	getCartById = async (cartId) => {
		const jsondata = this.readCartFile();
		if(!jsondata) return null;
		return jsondata.carts.find(cart => cart.id === cartId);
	};
	addProductsToCart = async (cartId, productsToCart) => {
		const jsondata = this.readCartFile();
		if(!jsondata) return null;
		const cart = jsondata.carts.find(cart => cart.id === cartId);
		if(!cart) return null;
		productsToCart.map(updateProduct => {
			const productData = Object.entries(updateProduct);
			const product = cart.products.find(product => product.id === productData[0][1]);
			if(!product){
				cart.products.push({
					id: productData[0][1],
					quantity: productData[1][1]
				})
			} else{
				product.quantity = productData[1][1]
			}
		});
		this.saveCartFile(jsondata.nextId, jsondata.carts);
		return cartId;
	};
	deleteAllProductsToCart = async (cartId) => {
		const jsondata = this.readCartFile();
		if(!jsondata) return null;
		const cartIndex = jsondata.carts.findIndex(cart => cart.id === cartId);
		if(cartIndex < 0) return null;
		jsondata.carts[cartIndex].products = [];
		this.saveCartFile(jsondata.nextId, jsondata.carts);
		return cartId;
	};
	deleteCart = async(cartId) => {
		const jsondata = this.readCartFile();
		if(!jsondata) return null;
		const cartIndex = jsondata.carts.findIndex(cart => cart.id === cartId);
		if(cartIndex < 0) return null;
		jsondata.carts.splice(cartIndex, 1);
		this.saveCartFile(jsondata.nextId, jsondata.carts);
		return cartId;
	};
}

export default CartFile;