import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        token: '',
    },
    reducers: {
        saveToken: (state, action) => {
            state.token = action.payload.token
        }
    }
})

export const { saveToken } = loginSlice.actions; 
export default loginSlice.reducer