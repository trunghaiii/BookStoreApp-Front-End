import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    isAuthenticated: boolean,
    user: {
        email: string,
        phone: string,
        fullName: string,
        role: string,
        avatar: string,
        id: string
    }
}

const initialState: CounterState = {
    isAuthenticated: false,
    user: {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    }
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        saveLoginData: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = true
            state.user = action.payload
            //console.log(">>> uh", action.payload);

        }
    },
})

// Action creators are generated for each case reducer function
export const { saveLoginData } = counterSlice.actions

export default counterSlice.reducer