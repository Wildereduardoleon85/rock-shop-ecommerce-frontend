import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem, Product, CartState, ShippingAddress } from '../types'
import {
  buildCartItemObject,
  getInitialState,
  getItemIndex,
  updateState,
} from '../helpers'

const initialState: CartState = {
  cartItems: [],
  itemsPrice: 0,
  paymentMethod: '',
  shippingAddress: {
    address: '',
    city: '',
    country: '',
    postalCode: '',
  },
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: getInitialState(initialState),
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; qty: number }>
    ) => {
      const { product, qty } = action.payload

      if (state.cartItems.length > 0) {
        const foundItemIndex = getItemIndex(state.cartItems, product._id)

        if (foundItemIndex !== null) {
          state.cartItems[foundItemIndex].qty = qty
        } else {
          state.cartItems = [
            ...state.cartItems,
            buildCartItemObject(product, qty),
          ]
        }
      } else {
        state.cartItems = [buildCartItemObject(product, qty)]
      }

      updateState(state)
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item: CartItem) => item._id !== action.payload
      )

      updateState(state)
    },

    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload
      updateState(state)
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload
      updateState(state)
    },
    clearCartItems: () => {
      localStorage.removeItem('cart')
      return initialState
    },
  },
})

export const {
  addToCart,
  removeItem,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions
