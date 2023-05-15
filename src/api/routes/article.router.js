import { Router } from "express";
import {
	createArticle,
	deleteArticleById,
	dislikeArticle,
	getArticleById,
	getArticles,
	likeArticle,
	updateArticleById,
} from "../controllers/article.controller.js";
import { checkArticleBody } from "../middlewares/article.middleware.js";

const articleRouter = Router();

articleRouter.route("/").get(getArticles).post(checkArticleBody, createArticle);

articleRouter
	.route("/:id")
	.get(getArticleById)
	.put(updateArticleById)
	.delete(deleteArticleById);

articleRouter.route("/:id/like").post(likeArticle);

articleRouter.route("/:id/dislike").post(dislikeArticle);

export default articleRouter;
