class ProductMemory{
	constructor(){
		this.nextId = 0;
		this.products = [];
	}
	getProducts = async(options) => {
		const pagination = {};
		pagination.totalProducts = this.products.length;
		pagination.totalPages = parseInt(this.products.length/options.limit) +1;
		if(options.page > 0 && options.page <= pagination.totalPages){
			pagination.page = options.page;
			pagination.prevPage = options.page > 1 ? options.page - 1 : null;
			pagination.nextPage = options.page < pagination.totalPages ? options.page + 1 : null;
			pagination.hasPrevPage = pagination.prevPage ? true : false;
			pagination.hasNextPage = pagination.nextPage ? true : false;
			pagination.prevLink = pagination.hasPrevPage ? `/api/product/?page=${pagination.prevPage}&limit=${options.limit}` : null;
			pagination.nextLink = pagination.hasNextPage ? `/api/product/?page=${pagination.nextPage}&limit=${options.limit}` : null;
		} else{
			if(options.page < 0){
				pagination.page = 1;
				pagination.prevPage = null;
				pagination.nextPage = pagination.page < pagination.totalPages ? pagination.page + 1 : null;
				pagination.hasPrevPage = false;
				pagination.hasNextPage = pagination.nextPage ? true : false;
				pagination.prevLink = null;
				pagination.nextLink = pagination.hasNextPage ? `/api/product/?page=${pagination.nextPage}&limit=${options.limit}` : null;
			} else{
				pagination.page = pagination.totalPages;
				pagination.prevPage = pagination.page > 1 ? pagination.page - 1 : null;
				pagination.nextPage = null;
				pagination.hasPrevPage = pagination.prevPage ? true : false;
				pagination.hasNextPage = false;
				pagination.prevLink = pagination.hasPrevPage ? `/api/product/?page=${pagination.prevPage}&limit=${options.limit}` : null;
				pagination.nextLink = null;
			}
		}
		return {
			products: options.limit < this.products.length ? this.products.slice((pagination.page-1)*options.limit, options.page*options.limit) : this.products,
			pagination
		};
	};
	getProductById = async(productId) => {
		return this.products.find(product => product.id === productId);
	};
	addProduct = async(productData) => {
		const newProduct = {
			id: this.nextId,
			...productData
		}
		this.nextId++;
		this.products.push(newProduct);
		return newProduct.id;
	};
	updateProductById = async(productId, productData) => {
		const product = this.products.find(product => product.id === productId);
		if(!product) return null;
		const updateData = Object.entries(productData);
		updateData.map(data => {
			product[data[0]] = data[1];
		});
		return product;
	};
	deleteProductById = async(productId) => {
		let totalProducts = this.products.length;
		this.products = this.products.filter(product => product.id !== productId);
		if(this.products.length === totalProducts) return null;
		return productId;
	};
}

export default ProductMemory;