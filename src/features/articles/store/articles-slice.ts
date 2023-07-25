import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Article } from '../interfaces/article.interface';

interface ArticlesState {
  activeArticle: Article | null;
}

const initialState: ArticlesState = {
  activeArticle: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setActiveArticle(state, action: PayloadAction<Article>) {
      state.activeArticle = action.payload;
    }
  }
});

export const { setActiveArticle } = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;