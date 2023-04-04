import { ProductService } from "../../repositories/product.repository.js";
import faker from "@faker-js/faker";
import { persistence } from "../../config.js";

export default async() => {
	console.log("TEST PRODUCT METHODS");
	console.log("");

	console.log("Test product method: 1");
	console.log("Case: agrega un producto");
	console.log("Se espera que retorne el Id del producto creado.");

	let result;
	let verif;

	let productData = {
		title: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.commerce.department(),
        stock: faker.random.numeric(1),
        image: faker.image.image()
	}

	result = await ProductService.addProduct(productData);
	
	if(result){	
		if(persistence === "FILE" || persistence === "MEMORY"){
			verif = false;
			if(typeof result === "number") verif = true;
		} else{
			verif = false;
			if(typeof result === "string") verif = true;
		}
		
		if(verif){
			console.log(`Test passed`);
		} else{
			console.log(`Test no passed.`);
			continuar = false;
		}
	} else{	
		console.log("Test no passed. Test result: null.");
		continuar = false;
	}
	
	console.log("");

	console.log("Test product method: 2");
	console.log("Case: se busca el producto creado.");
	console.log("Se espera que retorne producto creado.");

	result = await ProductService.getProductById(result);
	if(result){
		let verif = result.title === productData.title && result.price === productData.price && result.description === productData.description && result.stock === productData.stock && result.image === productData.image;
		if(verif){
			console.log(`Test passed`);
		} else{
			console.log(`Test no passed.`);
			continuar = false;
		}
	} else{
		console.log("Test no passed. Test result: null.");
		continuar = false;
	}
	console.log("");
}