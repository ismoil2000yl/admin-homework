import logger from "redux-logger";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import systemReducer from "./system";
import authReducer from "./auth";

const persistConfig = {
	key: "root",
	storage
};

const rootReducer = combineReducers({
	auth: authReducer,
	system: systemReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [];

if (process.env.NODE_ENV === "development") {
	middleware.push(logger);
}

const store = configureStore({
	reducer: persistedReducer,
	middleware
});

const persister = persistStore(store);

export { store, persister };
