import { setProfile } from "@/slices_redux/profileSlice"
import type { User } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch} from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export default function SideProfile() {
    const token = localStorage.getItem("token")
    const headers = {"Authorization" : `Bearer ${token}`}
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [profile, setSideProfile] =useState<User>({} as User)
    const [recomendedUser, setRecomendedUser] = useState<User[]>([])

    async function fetchProfile() {
        const response = await axios.get("http://localhost:3000/getProfile", {headers})
        dispatch(setProfile(response.data.data.profile))
        setSideProfile(response.data.data.profile)
    }

    async function getRecomendedUser() {
        try {
            const response = await axios.get("http://localhost:3000/user/recomended/user", {headers})
            setRecomendedUser(response.data.data.user)
        } catch (error) {
            console.log(error)
    }}
    
    useEffect(() => {
        fetchProfile()
        getRecomendedUser()
    }, [])
    
    const handleClick = () => {
        navigate("/")
    }

    return (
        <div className="w-[33%] bg-gray-100 flex flex-col pr-15 dark:bg-gray-950" id="SideProfile">
            <div className="mt-20 ml-20 h-100 w-90 bg-white border-gray-950 border-2 flex flex-col items-center rounded-4xl dark:bg-gray-900" onClick={handleClick}>
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
            <div className="w-90 h-70 flex overflow-y-scroll mt-4 bg-white ml-20 rounded-4xl border border-gray-400">
                <div className=" w-full min-h-40 rounded-4xl flex flex-col items-center">
                    <h1 className="mt-4 pb-2 text-2xl font-medium w-full text-center">Recomended User</h1>
                    <div>
                    {recomendedUser.map((user) => {
                    return (
                    <Link to={`/user/${user.id}`}>
                    <div className="w-90 mt-2 min-h-20 bg-white flex border-2 border-gray-400 dark:border-gray-800 rounded-4xl shadow-2xl dark:bg-gray-900" key={user.id} id={user.id as any}>
                    <div className="flex">
                            <div className="rounded-[50%] mt-2 ml-2 w-20 h-20 overflow-hidden flex justify-center border border-gray-800">
                        <img src={user.photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div className="w-full ml-5 flex flex-col">
                        <div>
                            <h1 className="font-medium text-4xl">{user.username}</h1>
                            <p className="font-bold">{user.email}</p>
                            <p>{user.bio}</p>
                        </div>
                    </div>
                    </div>
                    </Link>
                    )})}
                    </div>
                </div>
            </div>
        </div>
    )
}