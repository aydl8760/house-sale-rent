import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedreducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedreducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
