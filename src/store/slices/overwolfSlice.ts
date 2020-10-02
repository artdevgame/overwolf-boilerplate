import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const overwolfSlice = createSlice({
  initialState: {
    gameId: 0,
    launcherId: 0,
  },
  name: 'overwolf',
  reducers: {
    setGameId(state, action: PayloadAction<number>) {
      state.gameId = action.payload;
    },
    setLauncherId(state, action: PayloadAction<number>) {
      state.launcherId = action.payload;
    }
  },
});

export const {
  setGameId,
  setLauncherId,
} = overwolfSlice.actions;

export const overwolfReducer = overwolfSlice.reducer;
