import { AppError } from "../../utils/AppError.js";

export const checkUserBody = (req, res, next) => {
	if (!req.body.firstName) {
		return next(new AppError("Missing first name", 400));
	}
	if (!req.body.lastName) {
		return next(new AppError("Missing last name", 400));
	}
	if (!req.body.email) {
		return next(new AppError("Missing email", 400));
	}

	if (!req.body.role) {
		return next(new AppError("Missing role", 400));
	}

	if (!req.body.age) {
		return next(new AppError("Missing age", 400));
	}

	next();
};
