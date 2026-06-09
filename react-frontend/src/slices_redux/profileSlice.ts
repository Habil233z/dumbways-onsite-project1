import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        id: 0 ,
        username: "", 
        full_name: "", 
        photo_profile: ""}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
    setProfile: (state, action) => {state = action.payload.identity, console.log(state)},
    unSetProfile: (state) => {return initialState}
    }
})

export const {setProfile, unSetProfile} = profileSlice.actions
export default profileSlice.reducer