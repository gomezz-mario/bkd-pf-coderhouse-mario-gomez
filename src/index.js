import express from "express";
import { port } from "./config.js";

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.listen(port);
console.log('server listen on port ', port);