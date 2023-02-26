import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// apis
import { recommendationAPI } from "./apis/recommendation";

export const store = configureStore({
  reducer: {
    [recommendationAPI.reducerPath]: recommendationAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recommendationAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
