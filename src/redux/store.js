import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import session from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import cemeteriesReducer from "./slices/cemeteriesSlice";
import currentUserReducer from "./slices/currentUserSlice";
import deadReducer from "./slices/deadSlice";
import gendersReducer from "./slices/gendersSlice";
import nationalitiesReducer from "./slices/nationalitiesSlice";
import sidenavReducer from "./slices/sidenavSlice";
import usersReducer from "./slices/usersSlice";

const reducers = {
    sidenav: sidenavReducer,
    currentUser: currentUserReducer,
    users: usersReducer,
    dead: deadReducer,
    nationalities: nationalitiesReducer,
    genders: gendersReducer,
    cemeteries: cemeteriesReducer,
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
