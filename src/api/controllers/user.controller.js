import userMethods from "../../models/user/user.methods.js";

export const getUsers = async (req, res, next) => {
	try {
		const users = await userMethods.getAll(req.query);

		res.status(200).json({
			status: "success",
			results: users.length,
			data: { users },
		});
	} catch (err) {
		next(err);
	}
};

export const getUserByIdWithArticles = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};

export const createUser = async (req, res, next) => {
	try {
		const newUser = await userMethods.createUser(req.body);

		res.status(201).json({
			status: "success",
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		next(err);
	}
};

export const updateUserById = async (req, res, next) => {
	try {
		const updatedUser = await userMethods.updateUser(req.params.id, req.body);

		res.status(200).json({ status: "success", data: { user: updatedUser } });
	} catch (err) {
		next(err);
	}
};

export const deleteUserById = async (req, res, next) => {
	try {
	} catch (err) {
		next(err);
	}
};
