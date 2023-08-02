import {z as zod} from 'zod'

export const FORM_ARTICLE_SCHEMA = zod.object({
    title: zod.string().min(3, {message: 'Title must be at least 3 characters long'}).max(100, {message: 'Title must be less than 100 characters long'}),
    collectionName: zod.array(zod.string()).min(1, {message: 'You must select at least one collection'}),
})