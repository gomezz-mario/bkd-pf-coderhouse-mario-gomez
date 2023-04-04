import { ProductService } from "../../repositories/product.repository.js";

export default async () => {	
	let continuar = true;
	let result;

	console.log("TEST PRODUCT PAGINATION");
	console.log("");

	if(continuar){
		console.log("Test pagination: 1");
		console.log("Case: page < 1");
		console.log("Se espera que retorne la primera página.");
		result = await ProductService.getProducts({page:0});
		if(result){
			if(result.pagination.page === 1){
				console.log(`Test passed. Result.pagination.page: ${result.pagination.page}`);
			} else{
				console.log(`Test no passed. Result.pagination.page: ${result.pagination.page} != 1.`);
				continuar = false;
			}
		} else{
			console.log("Test no passed. Test result: null.");
			continuar = false;
		}
		console.log("");
	}

	if(continuar){	
		console.log("Test pagination: 2");
		console.log("Case: page > totalPages");
		console.log("Se espera que retorne la última página.");
		result = await ProductService.getProducts({page: result.pagination.totalPages +10});
		if(result){
			if(result.pagination.page === result.pagination.totalPages){
				console.log(`Test passed. { page: ${result.pagination.page}. totalPages: ${result.pagination.totalPages}}`);
			} else{
				console.log(`Test no passed. page: ${result.pagination.page} != totalPages: ${result.pagination.totalPages}.`);
				continuar = false;
			}
		} else{
			console.log("Test no passed. Test result: null.");
			continuar = false;
		}
		
		console.log("");
	}	

	if(continuar){
		let limit = 5;
		let page = 3;
		let totalProducts = result.pagination.totalProducts;
		if(totalProducts < 15){
			while(totalProducts <= 15){
				await ProductService.addProduct({
					title: "Producto de prueba",
					description: "Fake",
					price: 1
				});
				totalProducts++;
			}
		}
		console.log("Test pagination: 3");
		console.log("Case: 0 < page < totalPages");
		console.log("Se espera que retorne la pagina 3 con 5 productos");
		result = await ProductService.getProducts({page, limit});
		if(result){
			if(result.pagination.page === page && result.products.length === limit){
				console.log(`Test passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, limit: ${limit}, length: ${result.products.length} }`)
			} else{
				console.log(`Test no passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, limit: ${limit}, length: ${result.products.length} }`)
				continuar = false;
			}
		} else{
			console.log("Test no passed. Test result: null.");
			continuar = false;
		}
		console.log("");
	}

	if(continuar){
		console.log("Test pagination: 4");
		console.log("Case: limit > totalProducts y page = 1");
		console.log("Se espera que retorne 1 pagina con una cantidad de productos igual a totalProducts.");
		let totalProducts = result.pagination.totalProducts;
		result = await ProductService.getProducts({page: 1, limit: totalProducts + 5});
		if(result){
			if(result.pagination.page === 1 && result.products.length === totalProducts){
				console.log(`Test passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, totalProducts: ${totalProducts}, length: ${result.products.length} }`);
			} else{
				console.log(`Test no passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, totalProducts: ${totalProducts}, length: ${result.products.length} }`);
				continuar = false;
			}
		} else{
			console.log("Test no passed. Test result: null.");
			continuar = false;
		}
		console.log("");
	}

	if(continuar){
		console.log("Test pagination: 5");
		console.log("Case: limit > totalProducts y page = 2");
		console.log("Se espera que retorne 1 pagina con una cantidad de productos igual a totalProducts.");
		let totalProducts = result.pagination.totalProducts;
		result = await ProductService.getProducts({page: 2, limit: totalProducts + 5});
		if(result){
			if(result.pagination.page === 1 && result.products.length === totalProducts){
				console.log(`Test passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, totalProducts: ${totalProducts}, length: ${result.products.length} }`);
			} else{
				console.log(`Test no passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, totalProducts: ${totalProducts}, length: ${result.products.length} }`);
				continuar = false;
			}
		} else{
			console.log("Test no passed. Test result: null.");
			continuar = false;
		}
		console.log("");
	}

	if(continuar){
		console.log("Test pagination: 6");
		console.log("Case: page =1; limit < totalProducts");
		console.log("Se espera que retorne la primera pagina con una cantidad de productos igual a limit.");
		let totalProducts = result.pagination.totalProducts;
		let limit = parseInt(totalProducts/2);
		result = await ProductService.getProducts({page:1 , limit});
		if(result){
			if(result.pagination.page === 1 && result.products.length === limit){
				console.log(`Test passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, limit: ${limit}, length: ${result.products.length} }`);
			} else{
				console.log(`Test no passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, limit: ${limit}, length: ${result.products.length} }`);
				continuar = false;
			}
		} else{
			console.log("Test no passed. Test result: null.");
			continuar = false;
		}
		console.log("");
	}

	if(continuar){
		console.log("Test pagination: 7");
		console.log("Case: page = ultima pagina; limit < totalProducts");
		let totalProducts = result.pagination.totalProducts;
		let limit = parseInt(totalProducts/3);
		let totalPages = 4;
		if(totalProducts % limit === 0){
			await ProductService.addProduct({
				title: "Producto de prueba",
				description: "Fake",
				price: 10
			});
			totalProducts++;
		}
		let esperados = totalProducts % limit;
		console.log(`Se espera que retorne la última pagina con una cantidad de productos igual a ${esperados}.`);
		result = await ProductService.getProducts({page: totalPages, limit});
		if(result){
			if(result.pagination.page === result.pagination.totalPages && result.products.length === esperados){
				console.log(`Test passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, limit: ${limit}, length: ${result.products.length} }`);
			} else{
				console.log(`Test no passed. { page: ${result.pagination.page}, totalPages: ${result.pagination.totalPages}, limit: ${limit}, length: ${result.products.length} }`);
				continuar = false;
			}
		} else{
			console.log("Test no passed. Test result: null.");
			continuar = false;
		}
		console.log("");
	}

	return continuar;
}

