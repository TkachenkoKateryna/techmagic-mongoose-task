import mongoose from "mongoose";

export const articleSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			minLength: [5, "Title should be at least 5 symbols long"],
			maxLength: [400, "Title should be  not longer than 400 symbols"],
			required: [true, "An article must have a title"],
			trim: true,
		},
		subtitle: {
			type: String,
			minLength: [5, "Title should be at least 5 symbols long"],
		},
		description: {
			type: String,
			minLength: [5, "Title should be at least 5 symbols long"],
			maxLength: [5000, "Title should be  not longer than 5000 symbols"],
			required: [true, "An article must have a description"],
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "An article must have an owner"],
		},
		category: {
			type: String,
			enum: ["sport", "games", "history"],
			message: "Category is either sport, games, history",
			required: [true, "An article must have a category"],
		},
		likes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);

export const Article = mongoose.model("Article", articleSchema);
