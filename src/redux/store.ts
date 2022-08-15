import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartRedux";
import userReducer from "./reducers/userRedux";
import categoryReducer from "./reducers/categoryRedux";
import productReducer from "./reducers/productRedux";
import packagesReducer from "./reducers/packagesRedux";
import featuredProductReducer from "./reducers/featuredProductRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  category: categoryReducer,
  product: productReducer,
  package: packagesReducer,
  featuredProduct: featuredProductReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
