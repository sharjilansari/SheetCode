import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface isAuthenticated {
  isAuthenticated: boolean;
}

const initialState: isAuthenticated = {
  isAuthenticated: false,
};

const authenticatedSlice = createSlice({
  name: "isAuthenticated",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
        state.isAuthenticated = action.payload;
      },
  },
});

export const { setAuth } = authenticatedSlice.actions;
export default authenticatedSlice.reducer;
