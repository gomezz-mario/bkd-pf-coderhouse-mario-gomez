import { Product } from "../dao/factory.js";
import ProductDao from "../dao/product.dao.js";

export const ProductService = new ProductDao(new Product());