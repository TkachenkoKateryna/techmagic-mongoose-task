import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  
});

const Article = mongoose.model('Article', articleSchema);

export default Article;
