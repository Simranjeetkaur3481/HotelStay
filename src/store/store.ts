import { configureStore } from "@reduxjs/toolkit";
import { rootReducres } from "./rootReducer";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

export const persistedConfig = {
  key: "root",
  storage: storage.default ? storage.default : storage,
};

const persistedReducer = persistReducer(persistedConfig, rootReducres);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
