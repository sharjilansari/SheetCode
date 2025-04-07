import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface counterState {
  code: string;
}

const initialState: counterState = {
  code: "",
};

const counterSlice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    change(state, action: PayloadAction<string>) {
      state.code = action.payload;
    },
  },
});

export const { change } = counterSlice.actions;
export default counterSlice.reducer;
