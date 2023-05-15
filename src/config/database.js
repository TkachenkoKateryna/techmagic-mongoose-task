import mongoose from "mongoose";

export default function connectDB() {
	const DB = process.env.DATABASE.replace(
		"<password>",
		process.env.DATABASE_PASSWORD
	);

	mongoose.Promise = global.Promise;
	mongoose
		.connect(DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("Connection is successful"))
		.catch((err) => console.error(err));

	if (process.env.NODE_ENV === "development") {
		mongoose.set("debug", true);
	}
}
