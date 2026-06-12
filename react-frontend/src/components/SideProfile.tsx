import { setProfile } from "@/slices_redux/profileSlice"
import type { User } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"

export default function SideProfile() {
    const token = localStorage.getItem("token")
    const headers = {"Authorization" : `Bearer ${token}`}
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [profile, setSideProfile] =useState<User>({} as User)

    async function fetchProfile() {
        const response = await axios.get("http://localhost:3000/getProfile", {headers})
        dispatch(setProfile(response.data.data.profile))
        setSideProfile(response.data.data.profile)
    }
    
    useEffect(() => {
        fetchProfile()
    }, [])
    
    const handleClick = () => {
        navigate("/")
    }

    return (
        <div className="w-[33%] bg-gray-100 pt-20 flex justify-center pr-15 dark:bg-gray-950" id="SideProfile">
            <div className="ml-20 h-100 w-90 bg-white border-gray-950 border-2 flex flex-col items-center rounded-4xl dark:bg-gray-900" onClick={handleClick}>
                <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center items-center mt-10 border-2 border-gray-950">
                    <img src={profile.photo_profile} className="object-none h-full"></img>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl text-center">{profile.username}</h1>
                    <h2 className="text-xl">{profile.email}</h2>
                    <p className="mt-10"> {profile.bio}</p>
                    <p className="mt-20">Created At: {profile.created_at}</p>
                </div>
            </div>
        </div>
    )
}