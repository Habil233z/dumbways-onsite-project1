import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        id: 0 ,
        username: "", 
        full_name: "", 
        photo_profile: ""},
    reducers: {
    setProfile: (state, action) => {state = action.payload.identity, console.log(action.payload.identity), console.log(state),window.alert(action.payload.identity.username)},
    unSetProfile: (state) => {
        state= {
        id: 0 ,
        username: "", 
        full_name: "", 
        photo_profile: ""}
    }
    }
})

export const {setProfile, unSetProfile} = profileSlice.actions
export default profileSlice.reducer