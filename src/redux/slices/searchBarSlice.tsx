import { createSlice } from '@reduxjs/toolkit'
//import type { PayloadAction } from '@reduxjs/toolkit'

export interface orderState {
    searchText: string
}

const initialState: orderState = {
    searchText: ""
}

export const searchBarSlice = createSlice({
    name: 'searchbar',
    initialState,
    reducers: {
        searchTextAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.isAuthenticated = true
            // state.user = action.payload
            //console.log("payloadddd", action.payload);
            state.searchText = action.payload

        },

    },
})

// Action creators are generated for each case reducer function
export const { searchTextAction } = searchBarSlice.actions

export default searchBarSlice.reducer