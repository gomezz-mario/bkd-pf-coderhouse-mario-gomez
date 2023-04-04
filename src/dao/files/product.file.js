import fs from "fs";

class ProductFile{
	constructor(){
		this.filename = "./products.json";
	}

	readProductFile = () => {
		if(fs.existsSync(this.filename)){
			const data = fs.readFileSync(this.filename, 'utf-8');
            const jsondata = JSON.parse(data);
			return jsondata;
		}
		return null;
	}
	saveProductFile = (nextId, products) => {
		fs.writeFileSync(this.filename, JSON.stringify({
			nextId,
			products
		}));
	}
	getProducts = async(options) => {
		const jsondata = this.readProductFile();
		if(!jsondata) return [];
		return jsondata.products;
	};
	getProductById = async(productId) => {
		const jsondata = this.readProductFile();
		if(!jsondata) return null;
		return jsondata.products.find(product => product.id === productId);
	};
	addProduct = async(productData) => {
		const jsondata = this.readProductFile();
		const id = jsondata ? jsondata.nextId : 0;
		const products = jsondata ? jsondata.products : [];		 
		const product = {
			id,
			...productData
		}
		products.push(productData);
		const nextId = id + 1;
		this.saveProductFile(nextId, products);
		return product.id;
	};
	updateProductById = async(productId, productData) => {
		const jsondata = this.readProductFile();
		if(!jsondata) return null;
		const products = jsondata.products;
		const productIndex = products.findIndex(product => product.id === productId);
		if(productIndex < 0) return null;
		const updateDataArray = Object.entries(productData); 
		updateDataArray.map(data => {
			products[productIndex][data[0]] = data[1];
		});
		this.saveProductFile(jsondata.nextId, products);
		return productId;
	};
	deleteProductById = async(productId) => {
		const jsondata = this.readProductFile();
		if(!jsondata) return null;
		const products = jsondata.products;
		const productIndex = products.findIndex(product => product.id === productId);
		if(productIndex < 0) return null;
		products.splice(productIndex, 1);
		this.saveProductFile(jsondata.nextId, products);
		return productId;
	};
}

export default ProductFile;