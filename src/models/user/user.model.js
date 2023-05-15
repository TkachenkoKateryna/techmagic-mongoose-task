import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			minLength: [4, "First name should be at least 4 symbols long"],
			maxLength: [50, "First name should be  not longer than 50 symbols"],
			required: [true, "A user must have a first name"],
			trim: true,
		},
		lastName: {
			type: String,
			minLength: [3, "Last name should be at least 3 symbols long"],
			maxLength: [60, "Last name should be  not longer than 60 symbols"],
			required: [true, "A user must have a last name"],
			trim: true,
		},
		fullName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "A user must have an email"],
			lowercase: true,
			match: /.+\@.+\..+/,
			unique: [true, "User with such email already exists"],
		},
		role: {
			type: String,
			enum: ["admin", "writer", "guest"],
			message: "Role is either admin, writer, guest",
		},
		age: {
			type: Number,
			min: 1,
			max: 99,
		},
		numberOfArticles: {
			type: Number,
			default: 0,
		},
		likedArticles: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Article",
			},
		],
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", function (next) {
	if (this.age < 1) {
		this.age = 1;
	}

	this.fullName = `${this.firstName} ${this.lastName}`;
	next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
	const { firstName, lastName } = this.getUpdate();
	const userToUpdate = await this.model.findOne(this.getQuery());

	if (firstName || lastName) {
		this._update.fullName = `${firstName || userToUpdate.firstName} ${
			lastName || userToUpdate.lastName
		}`;
	}
	next();
});

export const User = mongoose.model("User", userSchema);
