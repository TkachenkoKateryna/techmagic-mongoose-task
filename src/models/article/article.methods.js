import { APIFeatures } from "../../utils/apiFeatures.js";
import { Article, articleSchema } from "./article.model.js";

articleSchema.methods.getArticles = function (queryParams) {
	const query = {};

	if (queryParams.title) {
		query.title = { $regex: queryParams.title, $options: "i" };
	}
	const features = new APIFeatures(Article.find(query), queryParams).paginate();

	return features.query;
};

articleSchema.methods.getUserArticles = function (userId) {
	return Article.find({ owner: userId }).select({
		title: 1,
		subtitle: 1,
		createdAt: 1,
		_id: 0,
	});
};

articleSchema.methods.getArticleById = function (id) {
	return Article.findById(id);
};

articleSchema.methods.createArticle = function (article) {
	return new Article(article).save();
};

articleSchema.methods.deleteArticle = function (id) {
	return Article.deleteOne({ _id: id });
};

articleSchema.methods.deleteManyArticles = function (userId) {
	return Article.deleteMany({ owner: userId });
};

export default articleSchema.methods;
