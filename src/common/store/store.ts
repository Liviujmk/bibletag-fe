import { configureStore } from '@reduxjs/toolkit';

import { articlesReducer } from '../../features/articles/store/articles-slice';
import { articlesApi } from '../../features/articles/api/articles.api';
import { appReducer } from './app-slice';

export const store = configureStore({
  // @ts-ignore
  reducer: {
    articles: articlesReducer,
    app: appReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;