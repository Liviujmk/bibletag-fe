import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Article } from '../interfaces/article.interface';
import { API_PATHS, BASE_API_URL } from '../../../common/constants/shared-constants';

export const articlesApi = createApi({
    reducerPath: 'articlesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
    
    endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
        getArticles: builder.query<Article[], void>({
            query: () => `${API_PATHS.ARTICLES}`,
            providesTags: ['Articles']
        }),
        
        getArticle: builder.query<Article, string>({
            query: (id: string) => `${API_PATHS.ARTICLES}/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Articles', id }]
        }),
        
        createArticle: builder.mutation({
            query: (article) => ({
                url: `${API_PATHS.ARTICLES}`,
                method: 'POST',
                body: article
            }),
            invalidatesTags: ['Articles']
        }),
        
        updateArticle: builder.mutation({
            query: (article) => ({
                url: `${API_PATHS.ARTICLES}/${article._id}`,
                method: 'PUT',
                body: article
            }),
            
            invalidatesTags: (_result, _error, article) => [{ type: 'Articles', id: article._id }]
        }),
        
        deleteArticle: builder.mutation<Article, string>({
            query: (id: string) => ({
                url: `${API_PATHS.ARTICLES}/${id}`,
                method: 'DELETE'
            }),
            
            invalidatesTags: (_result, _error, id) => [{ type: 'Articles', id }]
        })
    })
});

export const {
    useGetArticlesQuery,
    useGetArticleQuery,
    useCreateArticleMutation,
    useUpdateArticleMutation,
    useDeleteArticleMutation
} = articlesApi;