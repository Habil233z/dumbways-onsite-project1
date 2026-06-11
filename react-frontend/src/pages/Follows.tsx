import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Follow() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    const token = localStorage.getItem("token")
    const headers = {"Authorization" : `Bearer ${token}`}
    const [mode, setMode] = useState("following")
    const [searchedUsers, setSearchedUser] = useState([])
    const [followedUsers, setFollowedUsers] = useState([])
    
    async function handleFollowing() {
        const response = await axios.get("http://localhost:3000/follow/getFollowing", {headers})
        document.getElementById("followingButtonHead")?.classList.add("bg-gray-600")
        document.getElementById("followerButtonHead")?.classList.remove("bg-gray-600")
        setSearchedUser(response.data.data.userFollowed)
        setMode("following")
        setButton()
    }

    async function handleFollower() {
        const response = await axios.get("http://localhost:3000/follow/getFollower", {headers})
        document.getElementById("followerButtonHead")?.classList.add("bg-gray-600")
        document.getElementById("followingButtonHead")?.classList.remove("bg-gray-600")
        setSearchedUser(response.data.data.userFollowing)
        setButton()
    }

    async function setButton() {
        const response = await axios.get("http://localhost:3000/follow/getFollowing", {headers})
        const followersAlreadyFollow = response.data.data.userFollowed
        const thatPerson = followersAlreadyFollow.map((request) => request.id)
        setFollowedUsers(thatPerson)
    }

    const handleUnFollow = async (e, id) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/follow/unFollow", {id: id} ,{headers})
            handleFollowing()
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleFollow = async (e, id) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:3000/follow/follow", {id: id} ,{headers})
            handleFollowing()
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
    setTimeout(() => {
        handleFollowing()
    }, 50)
    

    document.getElementById("followsSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("postSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.remove("hidden")
    document.getElementById("profilePadding")?.classList.add("hidden")
    }, [])

    

    document.body.style.overflow = "hidden"

    return (
    <>
        <div className="h-screen flex bg-gray-100 flex-col  w-full items-center dark:bg-gray-950">
            <div className="bg-white h-15 w-full flex dark:bg-gray-900">
                <div id="followingButtonHead" className="h-full w-full border-b-2 border-gray-900 border-r-2 border-l-2 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700" onClick={handleFollowing}>
                    <h1 className="text-3xl">Following</h1>
                </div>
                <div id="followerButtonHead" className="h-full w-full border-b-2 border-gray-900 border-l-2 border-r-2 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700" onClick={handleFollower}>
                    <h1 className="text-3xl">Follower</h1>
                </div>
            </div>
            <div className="dark:bg-gray-950 bg-gray-100 h-full w-full overflow-auto">
                <div className="h-full w-full  flex flex-col items-center">
                    {searchedUsers.map((user) => {
                    return (
                    <div className="w-[60%] min-h-40 bg-white m-5 p-5 flex border-2 border-gray-900 rounded-4xl shadow-2xl dark:bg-gray-900" key={user.id} id={user.id}>
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
                            <div>
                                {followedUsers.includes(user.id) && <Button className="h-10" id={"unfollowBtn" + user.id} onClick={(e) => handleUnFollow(e, user.id)}>Unfollow</Button>}
                                {!followedUsers.includes(user.id) && <Button className="h-10" id={"followBtn" + user.id} onClick={(e) => handleFollow(e, user.id)}>Follow</Button>}
                            </div>
                        </div>
                    </div>
                    )})}
                </div>
            </div>
        </div>
    </>

    )
}