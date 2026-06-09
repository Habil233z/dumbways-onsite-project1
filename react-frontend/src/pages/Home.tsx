import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Home() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    const profileRedux = useSelector((state)=> state.profile) 
    const [profile, setProfile] = useState({})
    useEffect(() => {
        setProfile(profileRedux)
    })

    return (
        <div className="h-screen flex bg-gray-800 flex-col  w-full items-center">
            <div className="border-gray-800 border-2 h-100 w-[80%] bg-gray-400 justify-center items-center mt-20 flex flex-col">
                <h1 className="text-center font-bold text-6xl">Home</h1>
                <h1>Welcome home</h1>
                <h1 className="text-center font-bold text-4xl">{profile.username}</h1>
                <h2 className="text-center font-bold text-2xl">{profile.email}</h2>
            </div>
        </div>
    )
}