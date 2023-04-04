class ProductDao{
	constructor(productDao){
		this.productDao = productDao;
	}
	getProducts = async(options) => {
		if(!options.limit) options.limit = 10;
		if(!options.page) options.page = 1;
		return await this.productDao.getProducts(options);
	};
	getProductById = async(productId) => {
		return await this.productDao.getProductById(productId);
	};
	addProduct = async(productData) => {
		return await this.productDao.addProduct(productData);
	};
	updateProductById = async(productId, productData) => {
		return await this.productDao.updateProductById(productId, productData);
	};
	deleteProductById = async(productId) => {
		return await this.productDao.deleteProductById(productId);
	};
}

export default ProductDao;