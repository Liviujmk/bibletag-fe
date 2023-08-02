import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ArticlesState {
  activeUser: any;
}

const initialState: ArticlesState = {
  activeUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setActiveUser(state, action: PayloadAction<any>) {
      state.activeUser = action.payload;
    }
  }
    
});

export const { setActiveUser } = authSlice.actions;
export const authReducer = authSlice.reducer;