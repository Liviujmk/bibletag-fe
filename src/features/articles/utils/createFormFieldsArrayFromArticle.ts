import { Article } from "../interfaces/article.interface";

export const createFormFieldsArrayFromArticle = (article: Article) => {
    return [
        ['title', article.title],
        ['collectionName', article.collectionName],
        ['markdown', article.markdown]
    ]
}