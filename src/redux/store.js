import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import session from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import userReducer from "./slices/currentUserSlice";
import usersReducer from "./slices/usersSlice";

const reducers = {
    currentUser: userReducer,
    users: usersReducer,
};

const persistConfig = {
    key: "root",
    storage: session,
    whitelist: ["currentUser"],
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);
