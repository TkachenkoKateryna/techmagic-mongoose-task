import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import app from "./src/config/app.js";

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! Shutting down...");
	console.log(err.name, err.message);
});

dotenv.config();

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});

process.on("unhandledRejection", (err) => {
	console.log("Unhandled Shutting down...");
	console.log(err.name, err.message);
});
