import express from "express";
import logger from "morgan";
import router from "../api/routes/index.js";

const app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1", router);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something went wrong!");
});

export default app;
