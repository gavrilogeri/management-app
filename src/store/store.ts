import { Action, configureStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import companiesReducer from "../Components/Companies/companiesSlice";
import blogReducer from "../Components/Newsletter/blogSlice";
import commentReducer from "../Components/Newsletter/commentSlice";
import { saveState } from "../Components/UserControl";
import usersReducer from "../Components/Users/usersSlice";
// ...
// const persistedState = loadState();
export const store = configureStore({
  reducer: {
    companies: companiesReducer,
    users: usersReducer,
    blogs: blogReducer,
    comments: commentReducer,
  },
  // preloadedState: persistedState,
});

store.subscribe(() => {
  const state = store.getState() as any;
  Object.keys(state).forEach((key) => {
    saveState(key, state[key]);
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type RootAction = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
