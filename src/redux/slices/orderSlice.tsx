import { createSlice } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'

export interface orderState {
    cart: any
}

const initialState: orderState = {
    cart: []
}

export const accountSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doCartAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.isAuthenticated = true
            // state.user = action.payload
            let isProductPresent = state.cart.findIndex((element: any) => element._id === action.payload._id)
            if (isProductPresent > -1) {
                if (state.cart[isProductPresent].quantity + action.payload.quantity > action.payload.detail.quantity) {
                    state.cart[isProductPresent].quantity = action.payload.detail.quantity
                } else {
                    state.cart[isProductPresent].quantity = state.cart[isProductPresent].quantity + action.payload.quantity
                }

            } else {
                state.cart.push(action.payload)
            }
            // console.log(">>> uh", action.payload);

        },
        doCartUpdate: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.isAuthenticated = true
            // state.user = action.payload

            let isProductPresent = state.cart.findIndex((element: any) => element._id === action.payload._id)

            if (isProductPresent > -1) {
                if (action.payload.quantity > action.payload.detail.quantity) {
                    state.cart[isProductPresent].quantity = action.payload.detail.quantity
                } else {
                    state.cart[isProductPresent].quantity = action.payload.quantity
                }

            }
            // console.log(">>> uh", action.payload);

        },
        doCartDelete: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.isAuthenticated = true
            // state.user = action.payload

            let isProductPresent = state.cart.findIndex((element: any) => element._id === action.payload._id)

            if (isProductPresent > -1) {
                state.cart.splice(isProductPresent, 1)

            }
            // console.log(">>> uh", action.payload);

        }
    },
})

// Action creators are generated for each case reducer function
export const { doCartAction, doCartUpdate, doCartDelete } = accountSlice.actions

export default accountSlice.reducer