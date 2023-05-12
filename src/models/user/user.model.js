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
		},
		fullName: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "A user must have an email"],
			lowercase: true,
			validate: {
				validator: function (value) {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
				},
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
		role: {
			type: String,
			enum: ["admin", "writer", "guest"],
			message: "Difficulty is either east, medium, difficult",
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
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", function (next) {
	if (this.age < 0) {
		this.age = 1;
	}

	this.fullName = `${this.firstName} ${this.lastName}`;
	next();
});

export const User = mongoose.model("User", userSchema);
