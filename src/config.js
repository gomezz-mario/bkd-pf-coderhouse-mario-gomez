import dotenv from "dotenv";
dotenv.config();
export const port = process.env.PORT || 8080;
export const persistence = process.env.PERSISTENCE || "MEMORY";
export const mongoUrl = process.env.MONGO_URL;