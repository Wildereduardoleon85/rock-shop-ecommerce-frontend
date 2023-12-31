import { configureStore } from '@reduxjs/toolkit'
import {
  apiSlice,
  cartSlice,
  qtySlice,
  authSlice,
  alertSlice,
  modalSlice,
  ribbonSlice,
} from './slices'

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSlice.reducer,
    qty: qtySlice.reducer,
    auth: authSlice.reducer,
    alert: alertSlice.reducer,
    modal: modalSlice.reducer,
    ribbon: ribbonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
