import mongoose from "mongoose";

const CartSchema = mongoose.Schema({
	products : [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'products',
			},
			quantity: {
				type: Number,
				default: 1
			}
		}
	]
});
export default mongoose.model("carts", CartSchema);