import express from "express";
import logger from "morgan";
import router from "../api/routes/index.js";
import { AppError } from "../utils/AppError.js";
import { globalErrorHandler } from "../api/middlewares/error.middleware.js";

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(logger("dev"));
}
app.use(express.json());

app.use("/api/v1", router);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
