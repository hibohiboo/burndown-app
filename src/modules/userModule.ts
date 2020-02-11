import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AppThunk } from '../store';
import Board from '../api/board';

const { loginBoard } = Board;

type User = {
  uid: string;
  authed: boolean;
  board: string;
}
const initialState = ((): User | null => null)();

const userModule = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) =>  action.payload,
    setAuth: (state, action: PayloadAction<boolean>) => { if (state) state.authed = action.payload },
    setBoard: (state, action: PayloadAction<string>) => { if (state) state.board = action.payload },
  }
});

export default userModule;

export const useUser = () => {
  return useSelector((state: { user: ReturnType<typeof userModule.reducer> }) => state.user);
}

export const useAuthed = () => {
  return useSelector((state: { user: ReturnType<typeof userModule.reducer> }) => state.user !== null && state.user.authed);
}

export const useBoard = () => {
  return useSelector((state: { user: ReturnType<typeof userModule.reducer> }) => state.user ? state.user.board : '');
}

export const {
  setUser,
  setAuth,
  setBoard,
} = userModule.actions;

export const fetchLoginBoard = (
  board: string,
  pass: string
): AppThunk => async dispatch => {
  try {
    const result = await loginBoard(board, pass);
    dispatch(setAuth(result));
    dispatch(setBoard(board));
  } catch (err) {
    dispatch(setAuth(false));
  }
}