import {z as zod} from 'zod'

export const FORM_ARTICLE_SCHEMA = zod.object({
    title: zod.string().min(3, {message: 'Title must be at least 3 characters long'}).max(100, {message: 'Title must be less than 100 characters long'}),
    collectionName: zod.string().min(3, {message: 'Collection name must be at least 3 characters long'}).max(50, {message: 'Collection name must be less than 50 characters long'}),
    markdown: zod.string().min(1, {message: 'Markdown must be at least 3 characters long'})
})