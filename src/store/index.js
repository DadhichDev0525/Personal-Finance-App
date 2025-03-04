import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // LocalStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { transactionReducer } from "./slices/transactionSlice";
import { potsReducer } from "./slices/potsSlice";
import { budgetReducer } from "./slices/budgetSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  transactions: transactionReducer,
  pots : potsReducer,
  budgets : budgetReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore these actions
      },
    }),
});
export const persistor = persistStore(store);

export * from "./slices/transactionSlice";
export * from './slices/potsSlice';
export * from './slices/budgetSlice';
