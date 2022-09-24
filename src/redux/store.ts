import { configureStore } from "@reduxjs/toolkit";
import { contactsAPI } from "./api/contactsAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./reducers/userSlice";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    userState: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [contactsAPI.reducerPath]: contactsAPI.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      authApi.middleware,
      contactsAPI.middleware
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
