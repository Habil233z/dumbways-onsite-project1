import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function UserProfile() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    const profileRedux = useSelector((state)=> state.profile) 
    const [profile, setProfile] = useState({})
    useEffect(() => {
        setProfile(profileRedux)
    })

    document.getElementById("postSideHeader")?.classList.remove("bg-gray-200")
    document.getElementById("profileSideHeader")?.classList.add("bg-gray-200")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-200")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-200")
    document.getElementById("SideProfile")?.classList.remove("hidden")

    return (
        <div className="h-screen flex bg-gray-100 flex-col w-full items-center">
            <div className="border-gray-800 border-2 h-100 bg-white justify-center items-center mt-20 flex flex-col rounded-2xl pl-10 pr-10 shadow-4xl">
                <h1 className="text-center font-bold text-6xl">SociNet Account</h1>
                <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center items-center mt-5 border-2 border-gray-950">
                    <img src={profile.photo_profile} className="object-none h-full"/>
                </div>
                <h1 className="text-center font-bold text-4xl">{profile.username}</h1>
                <h2 className="text-center font-bold text-2xl">{profile.email}</h2>
                <p>{profile.bio}</p>
                <p className="mt-10">Created at: {profile.created_at}</p>
            </div>
        </div>
    )
}