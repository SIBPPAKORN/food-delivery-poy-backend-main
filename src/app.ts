import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createPool } from "mysql2/promise";
import errorHandler from "./middlewares/errors";
import customersRouter from "./routes/customers";
import foodItemsRouter from "./routes/foods";
import transactionRouter from "./routes/transactions";

export const app = express();

app.use(bodyParser.json());

app.use(cors());

export const pool = createPool({
	connectionLimit: 1,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

app.get("/", (req, res) => {
	res.status(200).json({
		status: "OK",
		request: { params: req.params, query: req.query, body: req.body },
	});
});

app.use(customersRouter);
app.use(foodItemsRouter);
app.use(transactionRouter);

app.use(errorHandler);
