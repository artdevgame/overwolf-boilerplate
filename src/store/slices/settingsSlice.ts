import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const settingsSlice = createSlice({
  initialState: {
    miniWindowHidden: false,
  },
  name: 'settings',
  reducers: {
    setMiniWindowHidden(state, action: PayloadAction<boolean>) {
      state.miniWindowHidden = action.payload;
    },
  },
});

export const { setMiniWindowHidden } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
