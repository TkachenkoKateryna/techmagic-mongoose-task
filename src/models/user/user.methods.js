import { APIFeatures } from "../../utils/apiFeatures.js";
import { User, userSchema } from "./user.model.js";

userSchema.methods.getAllUsers = function (queryParams) {
	const features = new APIFeatures(User.find(), queryParams).sort();

	return features.query.select({ fullName: 1, email: 1, age: 1 });
};

userSchema.methods.getUserById = function (id) {
	return User.findById(id);
};

userSchema.methods.getUserByIdWithArticles = function (id) {
	return User.findById(id);
};

userSchema.methods.createUser = function (user) {
	return new User(user).save();
};

userSchema.methods.updateUser = function (id, updateObj) {
	return User.findByIdAndUpdate(id, updateObj, {
		new: true,
		runValidators: true,
	});
};

userSchema.methods.deleteUser = function (id) {
	return User.findByIdAndDelete(id);
};

export default userSchema.methods;
