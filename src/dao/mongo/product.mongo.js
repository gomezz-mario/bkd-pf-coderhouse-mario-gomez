import ConnectMongo from "./connect.mongo.js";
import ProductModel from "./models/product.model.js";

class ProductMongo{
	constructor(){
		ConnectMongo.getInstance();
	}
	getProducts = async(options) => {
		const filter = {};
		const result = await ProductModel.paginate(filter, options);
		const doc = {
			products: result.docs,
			pagination: {
				totalPages: result.totalPages, 
				prevPage: result.prevPage, 
				nextPage: result.nextPage, 
				page: result.page, 
				hasPrevPage: result.hasPrevPage, 
				hasNextPage: result.hasNextPage, 
			}  
		};
		if(doc.pagination.page > doc.pagination.totalPages) return null;
		doc.pagination.prevLink = doc.hasPrevPage ? `/api/product/?page=${prevPage}&limit=${options.limit}` : null;
		doc.pagination.nextLink = doc.hasNextPage ? `/api/product/?page=${nextPage}&limit=${options.limit}` : null;
		return doc;
	};
	getProductById = async(productId) => {
		return await ProductModel.findById(productId);
	};
	addProduct = async(productData) => {
		return await ProductModel.create(productData);
	};
	updateProductById = async(productId, productData) => {
		return await ProductModel.findByIdAndUpdate(productId, productData);
	};
	deleteProductById = async(productId) => {
		return await ProductModel.findByIdAndDelete(productId);
	};
}

export default ProductMongo;