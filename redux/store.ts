import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "@react-native-async-storage/async-storage";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"], // Persist only specific slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Customize middleware to ignore non-serializable values for redux-persist actions
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
