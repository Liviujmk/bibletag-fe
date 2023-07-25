import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ArticlesState {
  activeTab: string;
}

const initialState: ArticlesState = {
  activeTab: '/',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveTab(state, action: PayloadAction<string>) {
      state.activeTab = action.payload;
    }
  }
});

export const { setActiveTab } = appSlice.actions;
export const appReducer = appSlice.reducer;