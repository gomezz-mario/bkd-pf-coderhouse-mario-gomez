import { ProductService } from "../../repositories/product.repository.js";
import paginationTest from "./product.paginate.js";
import { persistence } from "../../config.js";

let testPassed = 0;
let totalTest = 9;
let continuar = true;

let methodResult;
let arrayProductsLength;
let totalProducts;

// --- CONSTANTES DEL TEST ---
const totalProductsAdd = 10;
const newPrice = 12000;
const limitTest = 5;
const pageTest = 5;

const product = {
	name: "Producto de prueba",
	description: "Es fake",
	stock: 1,
	price: 1000
}

console.log("TEST DE PERSISTENCIA");
console.log(`Persistencia seleccionada: ${persistence}`);
console.log(`

Constantes seteadas:
totalProductsAdd: ${totalProductsAdd},
newPrice: ${newPrice},
limitTest: ${limitTest},
pageTest: ${pageTest}

`);



if(continuar){
	console.log("Test 1");
	console.log("Test: getProducts");
	methodResult = await ProductService.getProducts({});
	if(!methodResult || isNaN(methodResult.products.length)){
		continuar = false;
		console.log("Test no passed!");
		console.log("methodResult: ", methodResult, " products.length: ", methodResult.products.length);
	} else {
		arrayProductsLength = methodResult.products.length;
		totalProducts = methodResult.pagination.totalProducts;
		if(totalProducts > 10){
			if(arrayProductsLength === 10){
				console.log("Test passed!");
				testPassed++;
			} else {
				console.log("Se esperaba un total de 10 productos. Se recibieron: ", arrayProductsLength);
				console.log("Test no passed!");
				continuar = false;
			}
		} else{
			if(arrayProductsLength === totalProducts){
				console.log("Test passed!");
				testPassed++;
			} else {
				console.log("Se esperaba un total de ", totalProducts, "productos. Se recibieron: ", arrayProductsLength);
				console.log("Test no passed!");
				continuar = false;
			}
		}
	}
}

if(continuar){
	console.log("Test 2");
	console.log("Test: addProduct");
	methodResult = await ProductService.addProduct(product);
	if(persistence === "MEMORY" || persistence === "FILE"){
		if(typeof methodResult === "number"){
			console.log("Test passed!");
			testPassed++
		} else{
			console.log("Se esperaba un valor numérico. methodResult: ", typeof methodResult);
			console.log("Test no passed!");
			continuar = false;
		}
	} else{
		if(typeof methodResult === "string"){
			console.log("Test passed!");
			testPassed++;
		} else{
			continuar.log("Se esperaba un valor string. methodResult: ", typeof methodResult);
			console.log("Test no passed!");
			continuar = false;
		}
	}	
}

let productId; 
if(continuar){
	productId = methodResult;
	console.log("Test 3");
	console.log("Test: totalProducts");
	methodResult = await ProductService.getProducts({});
	if(methodResult && !isNaN(methodResult.pagination.totalProducts)){
		if(methodResult.pagination.totalProducts === totalProducts + 1){
			console.log("Test passed");
			arrayProductsLength = methodResult.products.length;
			totalProducts = methodResult.pagination.totalProducts;
			testPassed++;
		} else {
			console.log("Se esperaba que el valor de totalProducts fuera: ", totalProducts+1, "y es: ", methodResult.pagination.totalProducts);
			console.log("Test no passed");
			continuar = false;
		}
	} else {
		console.log("Method result null o totalProducts no es un valor numerico");
		console.log("Test no passed");
		continuar = false;
	}
}

if(continuar){
	console.log("Test 4");
	console.log("Test: getProductById");
	methodResult = await ProductService.getProductById(productId);
	if(!methodResult){
		console.log("El producto no fue encontrado");
		console.log("Test no passed!");
		continuar = false;
	} else{
		console.log("Test passed!");
		testPassed++;
	}
}

if(continuar){
	console.log("Test 5");
	console.log(`Agregamos ${totalProductsAdd} nuevos productos`);
	for (let i = 0; i < totalProductsAdd; i++) {
		productId = await ProductService.addProduct(product);
	}
	console.log("Test: totalProduct +", totalProductsAdd);
	methodResult = await ProductService.getProducts({});
	if(methodResult && methodResult.pagination.totalProducts === totalProducts + totalProductsAdd){
		console.log("Test passed!");
		testPassed++;
	} else{
		console.log("Se esperaba valor de totalProducts = ", totalProducts+totalProducts,". Se recibio: ", methodResult.pagination.totalProducts);
		console.log("Test no passed");
		continuar = false;
	}
}

if(continuar){
	console.log("Test 6");;
	console.log("Test: getProductById");
	methodResult = await ProductService.getProductById(productId);
	if(!methodResult){
		console.log("El producto no fue encontrado");
		console.log("Test no passed!");
		continuar = false;
	} else {
		console.log("Producto encontrado");
		console.log("Test passed!");
		testPassed++;
	}
}

if(continuar){
	console.log("Test 7");;
	console.log("Test: pagination");
	console.log("options = {limit: ",limitTest,", page: ",pageTest,"}");
	methodResult = await ProductService.getProducts({limit: limitTest, page: pageTest});
	if(methodResult){
		if(methodResult && methodResult.pagination.totalPages >= pageTest){
			if(methodResult.pagination.page === pageTest){
				if(methodResult.pagination.page !== methodResult.pagination.totalPages){
					if(methodResult.products.length === limitTest){
						console.log("Test passed!");
						testPassed++;
					} else{
						console.log(`Se esperaban ${limitTest} productos. Se recibieron: ${methodResult.products.length} products.`);
						console.log("Test no passed");
						continuar = false;
					}
				} else{
					let esperados = methodResult.pagination.totalProducts % limitTest;
					if(esperados === 0) esperados = limitTest;
					if(methodResult.products.length === esperados){
						console.log(`Esperados: ${esperados}. Recibidos: ${methodResult.products.length}.`);
						console.log("Test passed!");
						testPassed++;
					} else{
						console.log(`Se esperaban ${esperados} productos. Se recibieron: ${methodResult.products.length} products.`);
						console.log("Test no passed");
						continuar = false;
					}
				}
			} else{
				console.log(`Error de pagina. Se esperaba la pagina ${pageTest}. Se recibio: ${methodResult.pagination.page}.`);
				console.log("Test no passed");
				continuar = false;

			}
		} else{
			console.log("La pagina se sale de rango")
			console.log(methodResult);
			if(methodResult.products.length === 0){
				console.log("Test passed!");
				testPassed++;
			}
			
			//pagetest es mayor que totalpages: fuera de rango.
		}

	} else{
		console.log("Error");
		console.log("Test no passed!");
		continuar = false;
	}
}

if(continuar){
	if(await paginationTest()){
		console.log("TEST DE PAGINATION COMPLETED!")
		testPassed++;
	} else{
		console.log("TEST DE PAGINATION NO PASSED!")
		continuar = false;
	}
}

if(continuar){
	console.log("Test 8");;
	console.log("Test: updateProductById");
	console.log("Precio viejo: ",product.price,". Nuevo precio: ", newPrice);
	methodResult = await ProductService.updateProductById(productId, {price: newPrice});
	if(methodResult){
		methodResult = await ProductService.getProductById(productId);
		if(methodResult){
			if(methodResult.price === newPrice){
				console.log("El precio se actualizo correctamente");
				console.log("Test passed!");
				testPassed++;
			} else {
				console.log("El precio no se actualizo correctamente. Precio actual: ", methodResult.price);
				console.log("Test no passed!");
				continuar = false;
			}
		} else {
			console.log("Producto no encontrado");
			console.log("Test no passed!");
			continuar = false;
		}
	} else {
		console.log("Producto no encontrado o se produjo un error al actualizar");
		console.log("Test no passed!");
		continuar = false;
	}
}

if(continuar){
	console.log("Test 9");
	console.log("Eliminar producto con id: ", productId);
	methodResult = await ProductService.deleteProductById(productId);
	if(methodResult){
		if(methodResult === productId){
			methodResult = await ProductService.getProductById(methodResult);
			if(!methodResult){
				console.log("Producto no encontrado. Ha sido eliminado correctamente.");
				console.log("Test passed");
				testPassed++;
			} else{
				console.log("Producto encontrado ?..", methodResult);
				console.log("Test no passed");
				continuar = false;
			}
		} else{
			console.log("Se esperaba que el metodo retornara el id: ", productId, ". Retorno: ", methodResult);
			console.log("Test no passed");
			continuar = false;
		}
	} else{
		console.log("Error al eliminar un producto");
		console.log("Test no passed");
		continuar = false;
	}

}


if(continuar){
	console.log("Todos los test han sido completados correctamente")
} else{
	console.log(testPassed, " test completados. Restan: ", totalTest - testPassed);
}


	

	
	
	
