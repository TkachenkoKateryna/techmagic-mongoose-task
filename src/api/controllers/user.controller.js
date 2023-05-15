import articleMethods from "../../models/article/article.methods.js";
import userMethods from "../../models/user/user.methods.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsync } from "../../utils/catchAsync.js";

export const getUsers = catchAsync(async (req, res, next) => {
	const users = await userMethods.getAllUsers(req.query);

	res.status(200).json({
		status: "success",
		results: users.length,
		data: { users },
	});
});

export const getUserByIdWithArticles = catchAsync(async (req, res, next) => {
	const user = await userMethods.getUserById(req.params.id);

	if (!user) {
		return next(new AppError("No user found with that ID", 404));
	}

	const articles = await articleMethods.getUserArticles(user.id);

	res.status(200).json({
		status: "success",
		data: {
			user,
			articles,
		},
	});
});

export const createUser = catchAsync(async (req, res, next) => {
	const newUser = await userMethods.createUser(req.body);

	res.status(201).json({
		status: "success",
		data: {
			user: newUser,
		},
	});
});

export const updateUserById = catchAsync(async (req, res, next) => {
	const updatedUser = await userMethods.updateUser(req.params.id, req.body);

	if (!updatedUser) {
		return next(new AppError("No user found with that ID", 404));
	}

	res.status(200).json({ status: "success", data: { user: updatedUser } });
});

export const deleteUserById = async (req, res, next) => {
	const userId = req.params.id;
	const deletedUser = await userMethods.deleteUser(userId);

	if (!deletedUser) {
		return next(new AppError("No user found with that ID", 404));
	}

	await articleMethods.deleteManyArticles(userId);

	res.status(204).json({
		status: "success",
		data: null,
	});
};
