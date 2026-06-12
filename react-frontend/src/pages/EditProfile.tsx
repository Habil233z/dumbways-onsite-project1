import { Button } from "@/components/ui/button"
import { setProfile } from "@/slices_redux/profileSlice"
import type { User } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export default function EditProfile() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }
    const profileRedux = useSelector((state: any)=> state.profile) as User
    const [photo_profile, setPhoto_profile] = useState<string>("")
    const [newPhoto, setNewPhoto] = useState(null)
    const [username, setUsername] = useState("")
    const [full_name, setFull_name] = useState("")
    const [bio, setBio] = useState("")
    
    function handlePhotoChange(e: any) {
        const photo: any = URL.createObjectURL(e.target.files[0])
        setNewPhoto(e.target.files[0])
        setPhoto_profile(photo as any)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    async function handleSubmit(e: any) {
        e.preventDefault()
        const token = localStorage.getItem("token")
        try {
            const response = await axios.post("http://localhost:3000/editProfile", {username, full_name, bio, file: newPhoto}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
            localStorage.setItem("token", response.data.data.token)
            dispatch(setProfile(response.data.data.identity))
            navigate("/")
        } catch (error) {
            console.log(error)
        }}

    useEffect(() => {
        setPhoto_profile(profileRedux.photo_profile)
        setUsername(profileRedux.username)
        setFull_name(profileRedux.full_name)
        setBio(profileRedux.bio)
        
        document.getElementById("SideProfile")?.classList.add("hidden")
    }, [profileRedux])
    
     

    document.getElementById("postSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.add("hidden")
    document.getElementById("profilePadding")?.classList.remove("hidden")
    

    return (
        <div className="h-screen w-full bg-gray-100 flex justify-center items-center dark:bg-gray-950">
            <div className="w-[80%] pb-10 bg-white border-2 flex flex-col items-center dark:bg-gray-900">
                <form className="h-full w-full flex flex-col justify-center items-center dark:text-gray-300">
                <h1 className="text-center font-medium text-4xl mt-8">Edit Your Profile:</h1>
                <div className="w-full flex justify-center">
                    <div className="rounded-[50%] w-40 h-40 overflow-hidden items-center border-2 border-gray-950">
                        <label>
                            <img src={photo_profile} className="object-fill h-full"></img>
                            <input type="file" className="hidden" onChange={e => handlePhotoChange(e)}/>
                        </label>
                    </div>
                </div>
                    <div className="w-[80%]">
                    <div className="h-full w-full flex">
                        <div className="mr-5">
                            <h1 className="text-2xl mt-5">Username</h1>
                            <h1 className="text-2xl mt-5">Full Name</h1>
                            <h1 className="text-2xl mt-5">Bio</h1>
                        </div>
                        <div className="dark:text-gray-800">
                            <input className="text-2xl bg-gray-300 w-full mt-5 pl-2" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                            <input className="text-2xl bg-gray-300 w-full mt-5 pl-2" type="text" value={full_name} onChange={e => setFull_name(e.target.value)}/>
                            <input className="text-2xl bg-gray-300 w-full h-50 mt-5 pl-2" type="text" value={bio} onChange={e => setBio(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button type="submit" className="mt-8 bg-gray-950 text-gray-300 dark:bg-gray-950 dark:hover:bg-gray-700 dark:active:bg-gray-800" onClick={e => handleSubmit(e)}>Submit</Button>
                    </div>
                    </div>
                </form>   
            </div>
        </div>
    )
}