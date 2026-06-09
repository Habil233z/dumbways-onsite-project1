import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        id: 0 ,
        username: "", 
        email: "",
        full_name: "", 
        photo_profile: ""}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
    setProfile: (state, action) => {
        state.id = action.payload.id,
        state.username = action.payload.username,
        state.email = action.payload.email,
        state.full_name = action.payload.full_name,
        state.photo_profile = action.payload.photo_profile 
        },
    unSetProfile: () => {return initialState}
    }
})

export const {setProfile, unSetProfile} = profileSlice.actions
export default profileSlice.reducer