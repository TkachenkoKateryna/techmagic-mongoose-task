import articleMethods from "../../models/article/article.methods.js";
import userMethods from "../../models/user/user.methods.js";
import { catchAsync } from "../../utils/catchAsync.js";
import { AppError } from "../../utils/AppError.js";

export const getArticles = catchAsync(async (req, res, next) => {
	const articles = await articleMethods.getArticles(req.query).populate({
		path: "owner",
		select: { fullName: 1, email: 1, age: 1, _id: 0 },
	});

	res.status(200).json({
		status: "success",
		results: articles.length,
		data: {
			articles,
		},
	});
});

export const getArticleById = catchAsync(async (req, res, next) => {
	const { id: articleId } = req.params;

	if (!articleId.match(/^[0-9a-fA-F]{24}$/)) {
		return next(new AppError("Invalid id", 400));
	}

	const article = await articleMethods.getArticleById(articleId);

	if (!article) {
		return next(new AppError("No article found with that ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			article,
		},
	});
});

export const createArticle = catchAsync(async (req, res, next) => {
	const { userId, ...article } = req.body;
	const user = await userMethods.getUserById(userId);

	if (!user) {
		return next(new AppError("No user found with that ID", 404));
	}

	const newArticle = await articleMethods.createArticle({
		...article,
		owner: userId,
	});

	user.numberOfArticles++;
	await user.save();

	res.status(201).json({
		status: "success",
		data: {
			article: newArticle,
		},
	});
});

export const updateArticleById = catchAsync(async (req, res, next) => {
	const { id: articleId } = req.params;
	const { userId, title, subtitle, description, category } = req.body;

	const user = await userMethods.getUserById(userId);

	if (!user) {
		return next(new AppError("No user found with that ID", 404));
	}

	const article = await articleMethods.getArticleById(articleId);

	if (!article) {
		return next(new AppError("No article found with that ID", 404));
	}

	if (article.owner.toString() !== userId) {
		return next(
			new AppError("You don't have permission to modify the article", 403)
		);
	}

	if (title) article.title = title;
	if (subtitle) article.subtitle = subtitle;
	if (description) article.title = description;
	if (category) article.title = category;

	const updatedArticle = await article.save();

	res
		.status(200)
		.json({ status: "success", data: { article: updatedArticle } });
});

export const deleteArticleById = catchAsync(async (req, res, next) => {
	const { id: articleId } = req.params;
	const { userId } = req.body;

	const user = await userMethods.getUserById(userId);

	if (!user) {
		return next(new AppError("No user found with that ID", 404));
	}

	const article = await articleMethods.getArticleById(articleId);

	if (!article) {
		return next(new AppError("No article found with that ID", 404));
	}

	if (article.owner.toString() !== userId) {
		return next(
			new AppError("You don't have permission to modify the article", 403)
		);
	}

	await articleMethods.deleteArticle(articleId);

	user.numberOfArticles--;
	await user.save;

	res.status(204).json({
		status: "success",
		data: null,
	});
});

export const likeArticle = catchAsync(async (req, res, next) => {
	const { id: articleId } = req.params;
	const { userId } = req.body;

	const article = await articleMethods.getArticleById(articleId);

	if (!article) {
		return next(new AppError("No article found with that ID", 404));
	}

	const user = await userMethods.getUserById(userId);

	if (!user) {
		return next(new AppError("No user found with that ID", 404));
	}

	const hasLiked = article.likes.some((id) => id.toString() === userId);

	if (hasLiked) {
		return next(new AppError("Article has been already liked", 400));
	}

	await Promise.all([
		await article.updateOne({ $addToSet: { likes: user.id } }),
		await user.updateOne({ $addToSet: { likedArticles: article.id } }),
	]);

	res.status(200).json({
		status: "success",
		data: "Article liked",
	});
});

export const dislikeArticle = catchAsync(async (req, res, next) => {
	const { id: articleId } = req.params;
	const { userId } = req.body;

	const article = await articleMethods.getArticleById(articleId);

	if (!article) {
		return next(new AppError("No article found with that ID", 404));
	}

	const user = await userMethods.getUserById(userId);

	if (!user) {
		return next(new AppError("No user found with that ID", 404));
	}

	const hasLiked = article.likes.some((l) => l.toString() === userId);
	if (!hasLiked) {
		return next(new AppError("Article hasn't been liked", 400));
	}

	article.likes = article.likes.filter((id) => id.toString() !== userId);

	user.likedArticles = user.likedArticles.filter(
		(id) => id.toString() !== articleId
	);

	await Promise.all([await article.save(), await user.save()]);

	res.status(200).json({
		status: "success",
		data: "Article disliked",
	});
});
