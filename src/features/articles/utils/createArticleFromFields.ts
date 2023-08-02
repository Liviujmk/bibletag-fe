import { Article, ArticleFields } from "../interfaces/article.interface";

export const createArticleFromFields = (fields: ArticleFields): Article => {
    return {
        title: fields.title,
        body: fields.body,
        collectionName: fields.collectionName
    }
}