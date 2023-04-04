import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
	purchaser: String,
	amount: Number,
	code: {
		type: String,
		unique: true
	},
}, {
	timestamps: { 
		createdAt: 'purchase_datatime', 
		updatedAt: false 
	}});

export default mongoose.model("tickets", ticketSchema);