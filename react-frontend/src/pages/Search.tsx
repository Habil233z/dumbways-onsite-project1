import Profile from "@/components/SideProfile"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Search() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }
    const [firstOpen, setFirstOpen] = useState(true)
    const [searchedUser, setSearchedUser] = useState([])
    const [input, setInput] = useState("")
    const token = localStorage.getItem("token")
    const headers = {"Authorization" : `Bearer ${token}`}

    const handleFind = async () => {
        try {
            setFirstOpen(false)
            const response = await axios.post("http://localhost:3000/user/find", {input}, {headers})
            setSearchedUser(response.data.data.searchedUser)
        } catch (error) {
            
        }

    }

    document.getElementById("SideProfile")?.classList.remove("hidden")

    return (
        <div className="h-screen flex bg-gray-100 flex-col w-full">
            <div className="h-23 mb-10 bg-white border-b-2 border-gray-950 flex justify-center items-center">
                <input type="text" className="bg-gray-100 h-10 w-[70%] pl-6 border border-gray-800" placeholder="Search User" onChange={e => setInput(e.target.value)}/>
                <Button className="h-10" onClick={handleFind}>Find</Button>
            </div>
            <div className="flex flex-col w-full h-full items-center">
            <div className="bg-gray-100 w-[90%] rounded-4xl">
                {searchedUser.length === 0 && !firstOpen && 
                <div className="h-50 flex justify-center items-center">
                    <h1 className="text-4xl">No user found</h1>
                </div>}
                {searchedUser.map((user) => {
                    return (
                    <div className="w-100% min-h-40 bg-white m-5 p-5 flex border-2 border-gray-900 rounded-4xl shadow-2xl" key={user.id}>
                    <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border border-gray-800">
                        <img src={user.photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div  className="w-full ml-5">
                        <div>
                            <h1 className="font-medium text-4xl">{user.username}</h1>
                            <p>{user.full_name}</p>
                            <p>{user.email}</p>
                            <p className="mt-2">{user.bio}</p>
                        </div>
                        <div>
                            <div className="flex flex-row-reverse">
                                Created at: {user.created_at}
                            </div>
                        </div>
                    </div>
                    </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}

