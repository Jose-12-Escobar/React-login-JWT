import { configureStore } from "@reduxjs/toolkit";
import editSlice from "./reducers/editSlice";
import  loginSlice  from "./reducers/loginSlice";

export default configureStore({
    reducer: {
        loginState: loginSlice,
        editState: editSlice
    },
})