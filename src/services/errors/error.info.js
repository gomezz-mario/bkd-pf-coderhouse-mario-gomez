export const generateProductErrorInfo = product => {
	return `Uno o más propiedades estan incompletos o son invalidos
	Lista de propiedades obligatorias:
		* price: Necesita ser un Number. Recibio ${product.price}
		* name: Necesita ser un String. Recibio ${product.name}
		* code: Necesita ser un String. Recibio ${product.code}
	`
}