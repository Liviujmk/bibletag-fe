import { Article, ArticleFields } from "../interfaces/article.interface";

export const createArticleFromFields = (fields: ArticleFields): Article => {
    return {
        title: fields.title,
        markdown: fields.markdown,
        collectionName: fields.collectionName
    }
}