import type { User } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ProfilePadding() {
    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}

    const [recomendedUser, setRecomendedUser] = useState<User[]>([])

    async function getRecomendedUser() {
        try {
            const response = await axios.get("http://localhost:3000/user/recomended/user", {headers})
            setRecomendedUser(response.data.data.user)
        } catch (error) {
            console.log(error)
    }}

    useEffect(() => {
        getRecomendedUser()
    },[])

    return (
        <div className="w-[35%] bg-gray-100 flex justify-center pr-15 dark:bg-gray-950" id="profilePadding">
            <div className="w-full h-full flex justify-center items-center">
                <div className="bg-white w-100 h-150 rounded-4xl border border-gray-400 flex flex-col items-center dark:bg-gray-900 dark:border-gray-800">
                    <h1 className="mt-4 pb-2 text-2xl font-medium w-full text-center border-b border-gray-400 dark:border-gray-800">Recomended User</h1>
                    {recomendedUser.map((user) => {
                    return (
                    <Link to={`/user/${user.id}`}>
                    <div className="w-90 mt-2 min-h-40 bg-white flex border-2 border-gray-400 dark:border-gray-800 rounded-4xl shadow-2xl dark:bg-gray-900" key={user.id} id={user.id as any}>
                    <div className="flex">
                            <div className="rounded-[50%] mt-2 ml-2 w-20 h-20 overflow-hidden flex justify-center border border-gray-800">
                        <img src={user.photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div className="w-full ml-5 flex flex-col">
                        <div>
                            <h1 className="font-medium text-4xl">{user.username}</h1>
                            <p>{user.full_name}</p>
                            <p>{user.email}</p>
                            <p className="mt-2">{user.bio}</p>
                        </div>
                    </div>
                        
                    </div>
                    </Link>
                    )})}
                </div>
            </div>
        </div>
    )
}