import { setProfile } from "@/slices_redux/profileSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function Profile() {
    const token = localStorage.getItem("token")
    const headers = {"Authorization" : `Bearer ${token}`}
    const dispatch = useDispatch()

    const [profile, setSideProfile] =useState({})

    async function fetchProfile() {
        const response = await axios.get("http://localhost:3000/getProfile", {headers})
        dispatch(setProfile(response.data.data.profile))
        setSideProfile(response.data.data.profile)
    }
    
    useEffect(() => {
        fetchProfile()
    }, [])
    
    

    return (
        <div className="w-[33%] bg-gray-800 pt-20 flex justify-center border-l-2 border-gray-900">
            <div className="h-100 w-80 bg-gray-500 border-gray-950 border-2 flex flex-col items-center">
                <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center items-center mt-5 border-2 border-gray-950">
                    <img src={profile.photo_profile} className="object-none h-full"></img>
                </div>
                <div>
                    <h1 className="text-3xl">{profile.username}</h1>
                    <h2 className="text-2xl">{profile.email}</h2>
                    <p className=""> {profile.bio}</p>
                </div>
            </div>
        </div>
    )
}