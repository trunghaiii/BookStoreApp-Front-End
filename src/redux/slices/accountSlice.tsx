import { createSlice } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'

export interface accountState {
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

const initialState: accountState = {
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

export const accountSlice = createSlice({
    name: 'account',
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

        },
        doLogOut: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            localStorage.removeItem("access_token")
            state.isAuthenticated = false
            state.user = {
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }

        },
        updateUserRedux: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes

            state.user.fullName = action.payload.fullName
            state.user.phone = action.payload.phone
            if (action.payload.avatar) state.user.avatar = action.payload.avatar
            //console.log(">>> uh", action.payload);

        },
    },
})

// Action creators are generated for each case reducer function
export const { saveLoginData, doLogOut, updateUserRedux } = accountSlice.actions

export default accountSlice.reducer