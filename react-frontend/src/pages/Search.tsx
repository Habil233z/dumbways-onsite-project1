import Profile from "@/components/Profile"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Search() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }
    const [searchedUser, setSearchedUser] = useState([])
    const [input, setInput] = useState("")
    const token = localStorage.getItem("token")
    const headers = {"Authorization" : `Bearer ${token}`}

    const handleFind = async () => {
        try {
            const response = await axios.post("http://localhost:3000/user/find", {input}, {headers})
            setSearchedUser(response.data.data.searchedUser)
        } catch (error) {
            
        }

    }

    return (
        <div className="h-screen flex bg-gray-800 flex-col w-full">
            <div className="h-20 mb-10 bg-gray-700 border-b-2 border-gray-950 flex justify-center items-center">
                <input type="text" className="bg-gray-600 h-10 w-[70%] pl-6" placeholder="Search User" onChange={e => setInput(e.target.value)}/>
                <Button className="h-10" onClick={handleFind}>Find</Button>
            </div>
            <div className="flex flex-col w-full h-full items-center">
            <div className="bg-gray-500 w-[90%] rounded-4xl">
                {searchedUser.map((user) => {
                    return (
                    <div className="w-100% min-h-40 bg-gray-600 m-5 p-5 flex border-2 border-gray-900 rounded-4xl" key={user.id}>
                    <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center">
                        <img src={user.photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div  className="w-full ml-5">
                        <h1 className="font-medium text-2xl">{user.username}</h1>
                    </div>
                    </div>
                    )
                })}
            </div>
            </div>
        </div>
    )
}

