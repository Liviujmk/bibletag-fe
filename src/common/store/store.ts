import { configureStore } from '@reduxjs/toolkit';

import { articlesReducer } from '../../features/articles/store/articles-slice';
import { articlesApi } from '../../features/articles/api/articles.api';
import { appReducer } from './app-slice';
import { authReducer } from '../../features/auth/store/auth-slice';
import { collectionsApi } from '../../features/collections/api/collection-api';

export const store = configureStore({
  // @ts-ignore
  reducer: {
    articles: articlesReducer,
    app: appReducer,
    auth: authReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    articlesApi.middleware,
    collectionsApi.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;