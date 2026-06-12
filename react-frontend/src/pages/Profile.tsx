import { Button } from "@/components/ui/button"
import type { Likes, Post, Replies, User } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function UserProfile() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }
    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}
    const [userPost, setUserPost] = useState<Post[]>([])
    const [allLikes, setAllLikes] = useState<Likes[]>([])
    const [allReply, setAllReply] = useState<Replies[]>([])

    async function getUserPost() {
        try {
            const response = await axios.get("http://localhost:3000/post/getUserPost", {headers})
            setAllReply(response.data.data.replies)
            setUserPost(response.data.data.userPost)
        } catch (error) {
            console.log(error)
        }}

    async function mapLikes() {
        try {
            const response = await axios.get(`http://localhost:3000/like/get`,{headers})
            setAllLikes(response.data.data.likes)
            const id = response.data.data.decoded.id
            const userLike = response.data.data.likes.filter((like: Likes) => like.user_id === id)
            await userLike.map((like: Likes) => {
            document.getElementById("like" + like.thread_id)?.classList.add("fill-red-700")
        })
        } catch (error) {
            console.log(error)
        }
        
    }

    const handleLike = async (e: any, id: number) => {
        e.preventDefault()
        if (document.getElementById("like"+id)?.classList.contains("fill-red-700")){
            document.getElementById("like"+id)?.classList.remove("fill-red-700")
            await axios.post("http://localhost:3000/like/remove", {thread_id:id} ,{headers})
            mapLikes()
            getUserPost()
        } else {
            document.getElementById("like"+id)?.classList.add("fill-red-700")
            await axios.post("http://localhost:3000/like/add", {thread_id:id} ,{headers})
            mapLikes()
            getUserPost()
        }}

    const profileRedux = useSelector((state: any)=> state.profile) as User
    const [profile, setProfile] = useState<User>({} as User)
    useEffect(() => {
        setProfile(profileRedux)
        getUserPost()
        setTimeout(() => {
        mapLikes()
        }, 10)
    }, [profileRedux])

    document.getElementById("postSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.add("hidden")
    document.getElementById("profilePadding")?.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    return (
        <div className="h-screen flex bg-gray-100 flex-col w-full items-center dark:bg-gray-950 overflow-y-auto">
            <div className="w-[80%] border-gray-800 border-2 min-h-100 bg-white justify-center items-center mt-20 flex flex-col rounded-2xl pl-10 pr-10 shadow-4xl dark:bg-gray-900">
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
            <div className="h-screen w-[60%] flex flex-col items-center">
                <div className="mt-4 w-full bg-white border border-gray-500 rounded-4xl dark:bg-gray-900 dark:border-0">
                    <h1 className="text-3xl text-center">Your Post</h1>
                </div>
                <div>
                    {userPost.map((item) => {
                        return (
                            <div className="w-full items-center justify-center" key={item.id}>
                            <Link to={`/postDetail/${item.id}`}>
                            <div className="w-100% min-h-40 bg-white flex border border-gray-900 rounded-4xl m-5 shadow-xl dark:bg-gray-900">
                                <div className="flex">
                                        <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950 mt-5 ml-5">
                                    <img src={item.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                                    </div>
                                </div>
                                <div  className="w-full ml-5">
                                    <div className="flex">
                                        <div>
                                            <h1 className="mt-2">{item.created_at}</h1>
                                            <h1 className="font-medium text-2xl">{item.created_by}</h1>
                                        </div>
                                        <div className="w-full flex flex-row-reverse mt-5 mr-5">
                                            <div>


                                            </div>
                                        </div>
                                    </div>
                                    <p className="wrap-break-word">{item.content}</p>
                                        {item.image !== "http://localhost:3000/uploads/" && 
                                        <div className="max-w-full pr-20">
                                            <img src={item.image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                                        </div>}
                                    <div>
                                        <div className="flex mt-8 flex-row-reverse pb-5">
                                            <div className="flex justify-center items-center mr-5 ml-2" id={"likeCount"+ item.id}>{allLikes.filter(count => count.thread_id === item.id).length}</div>
                                            <svg viewBox="0 0 24 24" width="30" height="30" id={"like"+ item.id} onClick={(e) => {e.stopPropagation(); handleLike(e, item.id)}} className="fill-gray-700 hover:fill-red-500 active:fill-red-900"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>
                                            <div className="ml-2 mr-2">{allReply.filter(count => count.thread_id === item.id).length}</div>
                                            <svg viewBox="0 0 24 24" width="30" height="30" className="fill-gray-700 hover:fill-gray-600 active:fill-gray-500"><path d="m3.34,19.643l3.963-2.643h10.697V3c0-1.654-1.346-3-3-3H3C1.346,0,0,1.346,0,3v14.854c0,.793.435,1.519,1.134,1.894.318.171.667.255,1.015.255.416,0,.831-.121,1.191-.36ZM24,7v14.854c0,.793-.435,1.519-1.134,1.894-.318.171-.667.255-1.015.256-.416,0-.831-.121-1.19-.36l-3.964-2.644H6v-.727l1.908-1.273h12.092V4h1c1.654,0,3,1.346,3,3Z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                            </div>
                    )})}
                </div>
            </div>
        </div>
)}