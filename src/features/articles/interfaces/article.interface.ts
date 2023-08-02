// interface for arcitle / blog posts

export interface Article {
    _id?: string;
    title: string;
    content?: string;
    createdAt?: string;
    updatedAt?: string;
    collectionName?: string[];
    collectionId?: string;
    body: string;
}

export interface Collection {
    id?: string;
    title: string;
    createdAt?: string;
}

export interface ArticleFields {
    title: string;
    collectionName: string[];
    body: string;
}