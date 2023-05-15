import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../config/database.js";
import { User } from "../models/user/user.model.js";
import { Article } from "../models/article/article.model.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

connectDB();

const importData = async () => {
	const users = fs.readFileSync(path.join(__dirname, "users.json"), "utf-8");
	const articles = fs.readFileSync(
		path.join(__dirname, "articles.json"),
		"utf-8"
	);

	try {
		await User.create(JSON.parse(users));
		await Article.create(JSON.parse(articles));

		console.log("Data successfully loaded");
	} catch (err) {
		console.log(err);
	}

	process.exit();
};

const deleteData = async () => {
	try {
		await User.deleteMany();
		await Article.deleteMany();
		console.log("Data successfully deleted");
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
}
