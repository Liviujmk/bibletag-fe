import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Collection } from '../interfaces/collection.interface';
import { API_PATHS, BASE_API_URL } from '../../../common/constants/shared-constants';

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),

  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    getCollections: builder.query<Collection[], void>({
      query: () => `${API_PATHS.COLLECTIONS}`,
      providesTags: ['Collections']
    }),

    getCollection: builder.query<Collection, string>({
      query: (id: string) => `${API_PATHS.COLLECTIONS}/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Collections', id }]
    }),

    createCollection: builder.mutation({
      query: (collection) => ({
        url: `${API_PATHS.COLLECTIONS}`,
        method: 'POST',
        body: collection
      }),
      invalidatesTags: ['Collections']
    }),

    updateCollection: builder.mutation({
      query: ({
        id,
        ...collection
      }) => ({
        url: `${API_PATHS.COLLECTIONS}/${id}`,
        method: 'PUT',
        body: collection
      }),

      invalidatesTags: (_result, _error, collection) => [{ type: 'Collections', id: collection._id }]
    }),

    deleteCollection: builder.mutation<Collection, string>({
      query: (id: string) => ({
        url: `${API_PATHS.COLLECTIONS}/${id}`,
        method: 'DELETE'
      }),

      invalidatesTags: (_result, _error, id) => [{ type: 'Collections', id }]
    })
  })
});

export const {
  useGetCollectionsQuery,
  useGetCollectionQuery,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation
} = collectionsApi;