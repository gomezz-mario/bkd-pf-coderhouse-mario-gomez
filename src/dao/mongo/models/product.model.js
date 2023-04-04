import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const ProductSchema = mongoose.Schema({
	title: String,
  	description: String,
 	code: Number,
  	price: Number,
  	status: Boolean,
  	stock: Number,
  	thumbnail: String,
});

ProductSchema.plugin(mongoosePaginate);

export default mongoose.model("products", ProductSchema);