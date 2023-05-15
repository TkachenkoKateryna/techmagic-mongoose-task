import { AppError } from "../../utils/AppError.js";

export const checkArticleBody = (req, res, next) => {
	if (!req.body.title) {
		return next(new AppError("Missing title", 400));
	}
	if (!req.body.description) {
		return next(new AppError("Missing description", 400));
	}

	if (!req.body.category) {
		return next(new AppError("Missing category", 400));
	}

	next();
};
