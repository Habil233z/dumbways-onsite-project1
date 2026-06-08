import {configureStore} from "@reduxjs/toolkit"
import profileReducer from "./slices_redux/profileSlice"

const store = configureStore({
    reducer: {
    profile: profileReducer
    }
})

export default store