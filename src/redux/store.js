import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import session from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import currentUserReducer from "./slices/currentUserSlice";
import deadReducer from "./slices/deadSlice";
import gendersReducer from "./slices/gendersSlice";
import nationalitiesReducer from "./slices/nationalitiesSlice";
import usersReducer from "./slices/usersSlice";

const reducers = {
    currentUser: currentUserReducer,
    users: usersReducer,
    dead: deadReducer,
    nationalities: nationalitiesReducer,
    genders: gendersReducer,
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
