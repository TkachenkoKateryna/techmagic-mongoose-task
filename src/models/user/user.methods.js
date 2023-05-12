import { User, userSchema } from "./user.model.js";

userSchema.methods.getAll = function (queryParams) {
	const { sort } = queryParams;
	const sortOption = sort === "desc" ? -1 : 1;

	let query = User.find();

	if (sort) {
		return query.sort({ age: sortOption }).lean();
	}
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

export default userSchema.methods;
