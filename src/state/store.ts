import { configureStore } from "@reduxjs/toolkit";
import { charactersApi } from "./characters/apiSlice";
import characterReducer from "./characters/characterSlice";

export const store = configureStore({
  reducer: {
    character: characterReducer,
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
