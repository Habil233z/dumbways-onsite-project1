import { Button } from "@/components/ui/button"
import type { Follow, User } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Search() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }
    const [firstOpen, setFirstOpen] = useState<boolean>(true)
    const [searchedUser, setSearchedUser] = useState<User[]>([])
    const [followedUsers, setFollowedUsers] = useState<Follow[]>([])
    const [input, setInput] = useState<string>("")
    const token = localStorage.getItem("token")
    const headers = {"Authorization" : `Bearer ${token}`}
    const [userId, setUserId] = useState<number>(0)

    const handleFind = async () => {
        try {
            setFollowButton()
            setFirstOpen(false)
            const response = await axios.post("http://localhost:3000/user/find", {input}, {headers})
            setUserId(response.data.data.decoded.id)
            setSearchedUser(response.data.data.searchedUser)
        } catch (error) {
            console.log(error)
        }}

    async function setFollowButton() {
        const response = await axios.get("http://localhost:3000/follow/getFollowing", {headers})
        const followersAlreadyFollow = response.data.data.userFollowed
        const thatPerson = followersAlreadyFollow.map((request: Follow) => request.id)
        setFollowedUsers(thatPerson)
    }

    const handleUnFollow = async (e: any, id: number) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/follow/unFollow", {id: id} ,{headers})
            setFollowButton()
        } catch (error) {
            console.log(error)
        }}

    const handleFollow = async (e: any, id: number) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/follow/follow", {id: id} ,{headers})
            setFollowButton()
        } catch (error) {
            console.log(error)
        }}

    useEffect(() => {
        document.getElementById("profilePadding")?.classList.add("hidden")
    }, [])

    document.getElementById("postSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.remove("hidden")
    document.getElementById("profilePadding")?.classList.add("hidden")

    return (
        <div className="h-screen flex bg-gray-100 flex-col w-full dark:bg-gray-950">
            <div className="h-21 border-b border-r border-gray-600 flex justify-center items-center bg-white dark:bg-gray-950 dark:border-gray-800">
                <input type="text" className="rounded-4xl bg-gray-100 h-10 w-[70%] pl-6 border border-gray-800 dark:bg-gray-700" placeholder="Search User" onChange={e => setInput(e.target.value)}/>
                <Button className="h-10 ml-2" onClick={handleFind}>Find</Button>
            </div>
            <div className="flex flex-col w-full h-full items-center">
            <div className="bg-gray-100 w-[90%] rounded-4xl dark:bg-gray-950">
                {searchedUser.length === 0 && !firstOpen && 
                <div className="h-50 flex justify-center items-center">
                    <h1 className="text-4xl">No user found</h1>
                </div>}
                <div className="overflow-y-scroll pb-50">
                {searchedUser.map((user) => {
                    return (
                    <Link to={`/user/${user.id}`}>
                    <div className="min-h-40 bg-white m-5 p-5 flex border-2 border-gray-400 dark:border-0 rounded-4xl shadow-2xl dark:bg-gray-900" key={user.id} id={user.id as any}>
                    <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border border-gray-800">
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
                        <div>
                            <div className="flex flex-row-reverse">
                                Created at: {user.created_at}
                            </div>
                        </div>
                    </div>
                        <div>
                            {followedUsers.includes(user.id as any) && user.id !== userId && <Button className="h-10" id={"unfollowBtn" + user.id} onClick={(e) => handleUnFollow(e, user.id)}>Unfollow</Button>}
                            {!followedUsers.includes(user.id as any) && user.id !== userId && <Button className="h-10" id={"followBtn" + user.id} onClick={(e) => handleFollow(e, user.id)}>Follow</Button>}
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

