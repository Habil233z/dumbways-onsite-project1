import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function UserProfile() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    const profileRedux = useSelector((state)=> state.profile) 
    const [profile, setProfile] = useState({})
    useEffect(() => {
        setProfile(profileRedux)
    }, [profileRedux])

    document.getElementById("postSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.add("hidden")
    document.getElementById("profilePadding")?.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    return (
        <div className="h-screen flex bg-gray-100 flex-col w-full items-center dark:bg-gray-950">
            <div className="w-[85%] border-gray-800 border-2 h-100 bg-white justify-center items-center mt-10 flex flex-col rounded-t-2xl pl-10 pr-10 shadow-4xl dark:bg-gray-900">
                <div className="flex w-full">
                    <div className="w-full">
                        <div className="rounded-[50%] w-40 h-40 overflow-hidden flex justify-center items-center border-2 border-gray-950">
                            <img src={profile.photo_profile} className="object-fill h-full"/>
                        </div>
                        <h1 className="font-bold text-4xl">{profile.username}</h1>
                        <h2 className="font-bold text-2xl">{profile.email}</h2>
                        
                    </div>
                    <div className="w-full flex flex-row-reverse">
                        <Button className="h-10 w-25 bg-blue-700 hover:bg-blue-800 active:bg-blue-900"><Link to="/editProfile" className="text-gray-300">Edit Profile</Link></Button>
                    </div>
                </div>
                <p>{profile.bio}</p>
                <p className="mt-10">Created at: {profile.created_at}</p>
            </div>
        </div>
    )
}