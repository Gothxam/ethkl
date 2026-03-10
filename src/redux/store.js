import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slice'
import sidebarReducer from './sidebarCartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    sidebar: sidebarReducer,
  },
  devTools: true,
})