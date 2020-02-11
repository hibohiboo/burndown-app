import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

type User = {
  uid: string;
}
const initialState = ((): User | null => null)();

const userModule = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) =>  action.payload,
  }
});

export default userModule;

export const useUser = () => {
  return useSelector((state: { user: ReturnType<typeof userModule.reducer> }) => state.user);
}
