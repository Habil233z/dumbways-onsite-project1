import axios from "axios"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import type { Post, Likes, Replies, Follow } from "@/types"

export default function PostCard() {
    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [post, setPost] = useState<Post[]>([])
    const [allLikes, setAllLikes] = useState<Likes[]>([])
    const [allReply, setAllReply] = useState<Replies[]>([])
    const [followedUsers, setFollowedUsers] = useState<Follow[]>([])

    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}
    const [userId, setUserId] = useState(0)

    async function getPost() {
        try {
            setErrorStatus(false)
            const response = await axios.get("http://localhost:3000/post/get", {headers})
            setAllLikes(response.data.data.likes)
            setAllReply(response.data.data.replies)
            setPost(response.data.data.post)
            setUserId(response.data.data.decoded.id)
        } catch (error) {
            setErrorStatus(true)
    }}

    async function mapLikes() {
        try {
            setErrorStatus(false)
            const response = await axios.get(`http://localhost:3000/like/get`,{headers})
            setAllLikes(response.data.data.likes)
            const id = response.data.data.decoded.id
            const userLike = response.data.data.likes.filter((like: Likes) => like.user_id === id)
            await userLike.map((like: Likes) => {
            document.getElementById("like" + like.thread_id)?.classList.add("fill-red-700")
        })
        } catch (error) {
            console.log(error)
            setErrorStatus(true)
        }
        
    }

    const handleLike = async (e: any, id: number) => {
        e.preventDefault()
        if (document.getElementById("like"+id)?.classList.contains("fill-red-700")){
            document.getElementById("like"+id)?.classList.remove("fill-red-700")
            await axios.post("http://localhost:3000/like/remove", {thread_id:id} ,{headers})
            getPost()
        } else {
            document.getElementById("like"+id)?.classList.add("fill-red-700")
            await axios.post("http://localhost:3000/like/add", {thread_id:id} ,{headers})
            getPost()
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
        getPost()
        setTimeout(() => {
        setFollowButton()
        mapLikes()
        }, 10)
    }, [])

    return (
        <>
        {errorStatus && 
             <div className="w-full h-screen flex items-center justify-center">
                <div className="w-120 h-40 flex items-center justify-center bg-gray-600 border-4 border-gray-950">
                    <h1 className="font-extrabold text-4xl">Fail fetching threads</h1>
                </div>
            </div>}

        <div className="flex flex-col w-full items-center">
  
        <div className="overflow-y-scroll w-[60%] bg-gray-100 flex flex-col items-center rounded-4xl pb-40 dark:bg-gray-950">
        {post.map((item) => {
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
                                {followedUsers.includes(item.creator_id as any) && item.creator_id !== userId &&  <Button className="h-10" id={"unfollowBtn" + item.id} onClick={(e) => handleUnFollow(e, item.id)}>Unfollow</Button>}
                                {!followedUsers.includes(item.creator_id as any) && item.creator_id !== userId && <Button className="h-10" id={"followBtn" + item.id} onClick={(e) => handleFollow(e, item.id)}>Follow</Button>}
                                </div>
                            </div>
                        </div>
                        <p className="wrap-break-word">{item.content}</p>
                            {item.image !== "http://localhost:3000/uploads/" && 
                            <div className="max-w-full">
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
        </>
    )
}
