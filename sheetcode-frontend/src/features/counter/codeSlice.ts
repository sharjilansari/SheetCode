import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface counterState {
  codeMap: Record<string, string>; // { "python": "print('hi')", "cpp": "#include..." }
}
const initialState: counterState = {
  codeMap: {},
};

const counterSlice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    changeCode(state, action: PayloadAction<{ language: string; code: string }>) {
      state.codeMap[action.payload.language] = action.payload.code;
    },
  },
});

export const { changeCode } = counterSlice.actions;
export default counterSlice.reducer;
