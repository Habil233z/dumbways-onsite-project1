import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import type { Follow, Likes, Post, Replies, RepliesLike } from "@/types"
import { DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenu } from "../components/ui/dropdown-menu"

export default function PostDetail() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    const [repliesLikes, setRepliesLikes] = useState<Likes[]>([])
    const [postReply, setPostReply] = useState<Replies[]>([])

    const [mainThread, setMainThread] = useState<Post>({} as Post)
    const [mainLike, setMainLike] = useState<Likes[]>([])
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [followedUsers, setFollowedUsers] = useState<Follow[]>([])
    const [userId, setUserId] = useState<number>(0)

    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}
    const {id} = useParams()

    async function getMainPost() {
        try {
            const response = await axios.get(`http://localhost:3000/post/mainPost/${id}`,{headers})
            setMainThread(response.data.data.mainThread)
            setMainLike(response.data.data.mainLike)
            setUserId(response.data.data.decoded.id)
            const likeFilter = response.data.data.mainLike.map((likerId: Likes) => likerId.user_id)
            if (likeFilter.includes(response.data.data.decoded.id)) {
                document.getElementById("like" + mainThread.id)?.classList.add("fill-red-700")
            }
            } catch (error) {
                console.log(error)
        }}

    async function getPostReply() {
        try {
            const response = await axios.get(`http://localhost:3000/post/reply/${id}`,{headers})
            setRepliesLikes(response.data.data.likesReply)
            setPostReply(response.data.data.postReply)
        } catch (error) {
            console.log(error)
        }
    }

    async function getRepliesLikes() {
        try {
            const response = await axios.get(`http://localhost:3000/post/reply/${id}`,{headers})
            setRepliesLikes(response.data.data.likesReply)
            await response.data.data.likesReply.map((like: RepliesLike) => {
            document.getElementById("likeReply" + like.replie_id)?.classList.add("fill-red-700")
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
            getMainPost()
        } else {
            document.getElementById("like"+id)?.classList.add("fill-red-700")
            await axios.post("http://localhost:3000/like/add", {thread_id:id} ,{headers})
            getMainPost()
    }}

    const handleLikeReply = async (id: number) => {
        if (document.getElementById("likeReply"+id)?.classList.contains("fill-red-700")){
            document.getElementById("likeReply"+id)?.classList.remove("fill-red-700")
            await axios.post("http://localhost:3000/like/replyRemove", {replie_id:id} ,{headers})
            getPostReply()
        } else {
            document.getElementById("likeReply"+id)?.classList.add("fill-red-700")
            await axios.post("http://localhost:3000/like/replyAdd", {replie_id:id} ,{headers})
            getPostReply()
        }}

    const handleSubmit = async () => {
        if (content === "") {
            return window.alert("Post must have a text")
        }
        try {
            const token = localStorage.getItem("token")||null
            if (selectedFile === null) {
                await axios.post("http://localhost:3000/post/createReply", {content, thread_id: mainThread.id}, {headers})
                getPostReply()
            } 
            if (selectedFile !== null) {
                await axios.post("http://localhost:3000/post/createReply", {content, file:selectedFile, thread_id: mainThread.id}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
                getPostReply()
            }   
        } catch (error) {
            return window.alert("Not authenticated")
        }}

    async function setFollowButton() {
        const response = await axios.get("http://localhost:3000/follow/getFollowing", {headers})
        const followersAlreadyFollow = response.data.data.userFollowed
        const thatPerson = followersAlreadyFollow.map((request: Follow) => request.id)
        setFollowedUsers(thatPerson)
    }

    const handleUnFollow = async (e: any, mainThread: Post) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/follow/unFollow", {id: mainThread.creator_id} ,{headers})
            setFollowButton()
        } catch (error) {
            console.log(error)
        }}

    const handleFollow = async (e: any, mainThread: Post) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/follow/follow", {id: mainThread.creator_id} ,{headers})
            setFollowButton()
        } catch (error) {
            console.log(error)
        }}

        const handleDelete = async (e: any, id: number) => {
        const confirmation = window.confirm("Are you sure you want to delete this reply?")
        if (confirmation) {
            await axios.post("http://localhost:3000/post/deleteReply", {id} , {headers})
            console.log("Delete Confirmed")
            getPostReply()
        } else (
            console.log("Delete Canceled")
    )}

    useEffect(() => {
        getMainPost()
        setFollowButton()
        getPostReply()
        setTimeout(() => {
            getRepliesLikes()
        }, 100)
    }, [])

    document.getElementById("profilePadding")?.classList.add("hidden")
    document.getElementById("postSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    return (
    <div className="h-screen w-full flex">
        <div className="h-screen w-full flex justify-center bg-gray-100 overflow-y-scroll dark:bg-gray-950">
            <div className="h-screen w-full flex flex-col items-center">
                <div className="fixed right-[78%] top-2">
                <Link to="/post"><div className="h-15 w-15 bg-gray-200 rounded-4xl dark:bg-gray-900 flex justify-center items-center"><svg viewBox="0 0 24 24" width="30" height="30"><path className="dark:fill-gray-400" d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z"/></svg></div></Link>
                </div>
                <div className="pt-10 pb-20 w-[60%]">
                    <div className="flex flex-col items-center">
                            <div className="w-full flex bg-white border border-gray-900 rounded-4xl dark:bg-gray-900">
                                <div className="min-h-50 w-30 mt-3 ml-3">
                                    <div className="flex">
                                    <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950 mt-2 ml-2">
                                        <img src={mainThread.creator_photo_profile} className="object-none h-full" ></img>
                                    </div>
                                </div>
                                </div>
                                <div className="min-h-50 w-full flex flex-col">
                                    <h1 className="mt-2">{mainThread.created_at}</h1>
                                    <h1 className="font-bold text-4xl mt-2">{mainThread.created_by}</h1>
                                    <p className="wrap-break-word">{mainThread.content}</p>
                                    {mainThread.image !== "http://localhost:3000/uploads/" && 
                                    <div className="max-w-full pb-20">
                                        <img src={mainThread.image} alt="Fail to load image" className=""/>    
                                    </div>}
                                </div>
                                <div className="flex flex-col items-end min-h-50 pr-8 flex-1">
                                    <div className="mt-6">
                                        {followedUsers.includes(mainThread.creator_id as any) && mainThread.creator_id !== userId &&  <Button className="h-10" id={"unfollowBtn" + mainThread.creator_id} onClick={(e) => handleUnFollow(e, mainThread)}>Unfollow</Button>}
                                        {!followedUsers.includes(mainThread.creator_id as any) && mainThread.creator_id !== userId && <Button className="h-10" id={"followBtn" + mainThread.creator_id} onClick={(e) => handleFollow(e, mainThread)}>Follow</Button>}
                                    </div>
                                    <div className="flex flex-row-reverse h-full items-end">
                                        <div className="mb-5 ml-4" id={"likeCount"}>{mainLike.length}</div>
                                        <svg viewBox="0 0 24 24" width="30" height="30" id={"like"+ mainThread.id} onClick={(e) => {e.stopPropagation(); handleLike(e, mainThread.id)}}  className="mb-4 fill-gray-700 hover:fill-red-500 active:fill-red-900"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[80%] flex items-center justify-center mt-2">
                                <input type="text" className="bg-gray-100 w-[70%] h-10 border-2 border-gray-900 dark:bg-gray-700 pl-5" onChange={e => setContent(e.target.value)}/>
                                <div className="flex justify-center items-center w-10 h-10 bg-gray-400 mr-5 border-2 border-l-0 border-gray-900 hover:bg-gray-600 active:bg-gray-900">
                                    <label>
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <path d="m13,20.5c0,.276-.224.5-.5.5H4.5c-2.481,0-4.5-2.019-4.5-4.5V4.5C0,2.019,2.019,0,4.5,0h12c2.481,0,4.5,2.019,4.5,4.5v8c0,.276-.224.5-.5.5s-.5-.224-.5-.5V4.5c0-1.93-1.57-3.5-3.5-3.5H4.5c-1.93,0-3.5,1.57-3.5,3.5v8.336l3.811-3.811c1.322-1.322,3.628-1.322,4.95,0l7.094,7.122c.195.195.194.512,0,.707-.098.097-.226.146-.353.146-.128,0-.256-.049-.354-.147l-7.094-7.121c-.943-.943-2.591-.944-3.535,0L1,14.25v2.25c0,1.93,1.57,3.5,3.5,3.5h8c.276,0,.5.224.5.5Zm4-15c0,1.379-1.122,2.5-2.5,2.5s-2.5-1.121-2.5-2.5,1.122-2.5,2.5-2.5,2.5,1.121,2.5,2.5Zm-1,0c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5,1.5.673,1.5,1.5,1.5,1.5-.673,1.5-1.5Zm7.5,13.5h-3.5v-3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3.5h-3.5c-.276,0-.5.224-.5.5s.224.5.5.5h3.5v3.5c0,.276.224.5.5.5s.5-.224.5-.5v-3.5h3.5c.276,0,.5-.224.5-.5s-.224-.5-.5-.5Z"/>
                                    </svg>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e: any) => setSelectedFile(e.target.files[0])}/></label>
                                </div>
                                <Button className="bg-gray-950 text-gray-300 h-10 dark:bg-gray-800 dark:hover:bg-gray-900 dark:active:bg-gray-700" onClick={handleSubmit}>Post</Button>
                            </div>
                        </div>
                    <div className="h-full flex flex-col items-center">
                    {postReply.map ((reply) => {
                            return (
                            <div className="w-[80%] min-h-40 bg-white m-5 p-5 flex border-2 border-gray-900 rounded-4xl dark:bg-gray-900" key={reply.id}>
                                <div className="flex flex-col items-center">
                                    <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center">
                                        <img src={reply.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                                    </div>
                                    <div className="mt-2">    
                                        {followedUsers.includes(reply.creator_id as any) && reply.creator_id !== userId &&  <Button className="h-10" id={"unfollowBtn" + reply.creator_id} onClick={(e) => handleUnFollow(e, reply)}>Unfollow</Button>}
                                        {!followedUsers.includes(reply.creator_id as any) && reply.creator_id !== userId && <Button className="h-10" id={"followBtn" + reply.creator_id} onClick={(e) => handleFollow(e, reply)}>Follow</Button>}
                                    </div>
                                </div>
                                <div  className="w-full ml-5 flex">
                                    <div className="w-full">
                                        <h1 className="mt-2">{reply.created_at}</h1>
                                        <h1 className="font-medium text-2xl">{reply.created_by}</h1>
                                        <p className="wrap-break-word">{reply.content}</p>
                                        {reply.image !== "http://localhost:3000/uploads/" && 
                                        <div className="pb-10">
                                            <img className="max-h-50" src={reply.image} alt="Fail to load image" onClick={(e) => {e.stopPropagation()}}/>    
                                        </div>}
                                    </div>
                                </div>
                                <div className="flex flex-col h-full items-end">
                                    {reply.creator_id === userId && 
                                            <DropdownMenu>
                                                <DropdownMenuTrigger >
                                                    <div className=" h-8 flex items-center rounded-4xl" onClick={(e) => {e.preventDefault()}}><svg viewBox="0 0 512 512" width="20" height="20"><g><circle cx="256" cy="42.667" r="42.667"/><circle cx="256" cy="256" r="42.667"/><circle cx="256" cy="469.333" r="42.667"/></g></svg></div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem onClick={(e) => {e.stopPropagation()}}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={(e) => {e.stopPropagation(); handleDelete(e, reply.id)}}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>}
                                    {reply.creator_id !== userId && <div className="h-8"></div>}
                                    <div className="flex items-end h-full flex-row-reverse mt-4">
                                        <div className="flex justify-center items-center mr-2 ml-5" id={"likeCount"+ reply.id}>{repliesLikes.filter((count: Likes) => count.replie_id === reply.id).length}</div>
                                        <svg viewBox="0 0 24 24" width="30" height="30" id={"likeReply"+ reply.id} onClick={(e) => {e.stopPropagation(); handleLikeReply(reply.id)}} className="fill-gray-700 hover:fill-red-500 active:fill-red-900"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>
                                    </div>
                                </div>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}