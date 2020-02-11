import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = '';

// actions と reducers の定義
const updatedUidModule = createSlice({
  name: "updatedUid",
  initialState,
  reducers: {
    setUpdatedUid: (state, action: PayloadAction<string>) => action.payload,
  }
});

export const useUpdatedUid = () => {
  return useSelector((state: { updatedUid: ReturnType<typeof updatedUidModule.reducer> }) => state.updatedUid);
}

export default updatedUidModule;
