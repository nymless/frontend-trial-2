import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
}

const initialState = {
  user: null as User | null,
};

export const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { logout, setUser } = userSlice.actions;
