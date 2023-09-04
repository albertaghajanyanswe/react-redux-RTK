import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import userReducer from './reducers/UsersSlice';
import counterReducer from './reducers/CounterSlice';
import { userAPI } from "../services/rtk/UserService";

const rootReducer = combineReducers({
  userReducer,
  counterReducer,
  [userAPI.reducerPath]: userAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];