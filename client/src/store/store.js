import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import listReducer from "./listing-slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import orderRouter from "./order-slice";
import adminRouter from "./admin-slice";
const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
  order: orderRouter,
  admin: adminRouter,
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
