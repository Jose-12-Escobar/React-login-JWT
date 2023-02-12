import { createSlice } from "@reduxjs/toolkit";

export const editSlice = createSlice({
    name: 'edit',
    initialState: {
        user: {},
    },
    reducers: {
        userForEdit: (state, action) => {
            state.user = action.payload.user
        }
    }
})

export const { userForEdit } = editSlice.actions; 
export default editSlice.reducer