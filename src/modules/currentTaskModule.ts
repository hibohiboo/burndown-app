import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = 0;

// actions と reducers の定義
const currentTaskModule = createSlice({
  name: "currentTask",
  initialState,
  reducers: {
    setCurrentTask: (state, action: PayloadAction<number>) => action.payload,
  }
});

export const useCurrentTask = () => {
  return useSelector((state: { currentTask: ReturnType<typeof currentTaskModule.reducer> }) => state.currentTask);
}

export default currentTaskModule;
