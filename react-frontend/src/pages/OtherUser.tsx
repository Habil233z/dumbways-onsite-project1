import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Follow, Likes, Post, Replies, User } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function OtherUser() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }
    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}
    const [userPost, setUserPost] = useState<Post[]>([])
    const [userReply, setUserReply] = useState<Replies[]>([])
    const [allLikes, setAllLikes] = useState<Likes[]>([])
    const [allReply, setAllReply] = useState<Replies[]>([])
    const [profile, setProfile] = useState<User>({} as User)
    const [decoded, setDecoded] = useState<User>({} as User)
    const [followedUsers, setFollowedUsers] = useState<Follow[]>([])
    const [repliesLikes, setRepliesLikes] = useState<Likes[]>([])
    
    const id = useParams()

    async function getUser() {
        try {
            const response = await axios.get(`http://localhost:3000/user/${id.id}`, {headers})
            setProfile(response.data.data.searchedUser)
            setDecoded(response.data.data.decoded)
        } catch (error) {
            console.log(error)
    }}

    async function getUserPostAndReply() {
        try {
            const response = await axios.get(`http://localhost:3000/user/getOtherUserPostAndReply/${id.id}`, {headers})
            setAllReply(response.data.data.replies)
            setUserPost(response.data.data.userPost)
            setUserReply(response.data.data.userReply)
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
            getUserPostAndReply()
        } else {
            document.getElementById("like"+id)?.classList.add("fill-red-700")
            await axios.post("http://localhost:3000/like/add", {thread_id:id} ,{headers})
            mapLikes()
            getUserPostAndReply()
        }}

    const handleLikeReply = async (e: any, id: number) => {
        e.preventDefault()
        if (document.getElementById("likeReply"+id)?.classList.contains("fill-red-700")){
            document.getElementById("likeReply"+id)?.classList.remove("fill-red-700")
            await axios.post("http://localhost:3000/like/replyRemove", {replie_id:id} ,{headers})
            getUserPostAndReply()
        } else {
            document.getElementById("likeReply"+id)?.classList.add("fill-red-700")
            await axios.post("http://localhost:3000/like/replyAdd", {replie_id:id} ,{headers})
            getUserPostAndReply()
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
        getUser()
        setFollowButton()
        getUserPostAndReply()
        setTimeout(() => {
        mapLikes()
        }, 10)
    }, [])

         // post dropdown
    
        const [editPostContent, setEditPostContent] = useState("")
        const [editPostImage, setEditPostImage] = useState("")
        const [editPostNewImage, setEditPostNewImage] = useState<File | null>(null)
    
        function setEditPost(content: string, image: string) {
            setEditPostContent(content)
            setEditPostImage(image)
        }
    
        function handlePostPhotoChange(e: any) {
            const photo: string = URL.createObjectURL(e.target.files[0])
            setEditPostNewImage(e.target.files[0])
            setEditPostImage(photo)
        }
    
        async function submitEditPost(id: number) {
            await axios.put("http://localhost:3000/post/edit", {content: editPostContent, file: editPostNewImage, id}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
            getUserPostAndReply()
        }
    
        const handleDeletePost = async (id: number) => {
            await axios.post("http://localhost:3000/post/delete", {id} , {headers})
            getUserPostAndReply()
        }
        
        // reply dropdown
        
        const [editReplyContent, setEditReplyContent] = useState("")
        const [editReplyImage, setEditReplyImage] = useState("")
        const [editReplyNewImage, setEditReplyNewImage] = useState<File | null>(null)
    
        function setEditReply(content: string, image: string) {
            setEditReplyContent(content)
            setEditReplyImage(image)
        }
    
        function handleReplyPhotoChange(e: any) {
            const photo: string = URL.createObjectURL(e.target.files[0])
            setEditReplyNewImage(e.target.files[0])
            setEditReplyImage(photo)
        }
    
        async function submitEditReply(id: number) {
            await axios.put("http://localhost:3000/post/editReply", {content: editReplyContent, file: editReplyNewImage, id}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
            getUserPostAndReply()
        }
    
        const handleDeleteReply = async (id: number) => {
            await axios.post("http://localhost:3000/post/deleteReply", {id} , {headers})
            getUserPostAndReply()
        }
    

    document.getElementById("postSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.add("hidden")
    document.getElementById("profilePadding")?.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    return (
        <div className="h-screen flex bg-gray-100 flex-col w-full items-center dark:bg-gray-950 overflow-y-auto">
            <div className="w-[80%] border-gray-400 dark:border-0 border-2 min-h-100 bg-white justify-center items-center mt-20 flex flex-col rounded-2xl pl-10 pr-10 shadow-4xl dark:bg-gray-900">
                <div className="flex w-full">
                    <div className="w-full">
                        <div className="rounded-[50%] w-40 h-40 overflow-hidden flex justify-center items-center border-2 border-gray-950">
                            <img src={profile.photo_profile} className="object-fill h-full"/>
                        </div>
                        <h1 className="font-bold text-4xl">{profile.username}</h1>
                        <h2 className="font-bold text-2xl">{profile.email}</h2>
                        
                    </div>
                    <div className="w-full flex flex-row-reverse">
                        {followedUsers.includes(profile.id as any) && profile.id !== decoded.id && <Button className="h-10" id={"unfollowBtn" + profile.id} onClick={(e) => handleUnFollow(e, profile.id)}>Unfollow</Button>}
                        {!followedUsers.includes(profile.id as any) && profile.id !== decoded.id && <Button className="h-10" id={"followBtn" + profile.id} onClick={(e) => handleFollow(e, profile.id)}>Follow</Button>}
                    </div>
                </div>
                <p className="flex w-full">{profile.bio}</p>
                <p className="mt-10">Created at: {profile.created_at}</p>
            </div>
                        <div className="h-screen w-[80%] flex justify-center">
            <div className="w-full flex flex-col items-center mr-2">
                <div className="mt-4 w-full bg-white border border-gray-500 rounded-4xl dark:bg-gray-900 dark:border-0">
                    <h1 className="text-3xl text-center">User Post</h1>
                </div>
                <div>
                    {userPost.map((item) => {
                        return (
                            <div className="w-full items-center justify-center" key={item.id}>
                            <Link to={`/post/${item.id}`}>
                            <div className="w-100% min-h-40 bg-white flex border border-gray-400 dark:border-0 rounded-4xl m-5 shadow-xl dark:bg-gray-900">
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
                                            {item.creator_id === profile.id && 
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger >
                                                        <div className=" h-8 flex items-center rounded-4xl" onClick={(e) => {e.preventDefault()}}><svg className="dark:fill-gray-200" viewBox="0 0 512 512" width="20" height="20"><g><circle cx="256" cy="42.667" r="42.667"/><circle cx="256" cy="256" r="42.667"/><circle cx="256" cy="469.333" r="42.667"/></g></svg></div>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent onClick={(e) => {e.stopPropagation()}}>
                                                        <Dialog>
                                                            <DialogTrigger className="w-full hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setEditPost(item.content, item.image)}>Edit</DialogTrigger>
                                                            <DialogContent className="w-200">
                                                                <DialogHeader>
                                                                <DialogTitle className="text-2xl">Edit your post:</DialogTitle>
                                                                <DialogDescription>
                                                                    <div className="flex">
                                                                    <textarea className="rounded-2xl pl-3 pr-3 w-full text-gray-800 bg-gray-100 border-gray-400 border-2" value={editPostContent} onChange={e => setEditPostContent(e.target.value)}></textarea>
                                                                    <DialogTrigger><Button className="h-12 ml-3" onClick={() => {submitEditPost(item.id)}}>Edit Post</Button></DialogTrigger>
                                                                    </div>
                                                                    {editPostImage !== "http://localhost:3000/uploads/" && 
                                                                    <label className="max-w-full flex justify-center mt-4">
                                                                        <img src={editPostImage} className="" alt="No image selected"></img>
                                                                        <input type="file" className="hidden" onChange={e => handlePostPhotoChange(e)}/>
                                                                    </label>
                                                                    }
                                                                    {editPostImage === "http://localhost:3000/uploads/" && 
                                                                    <div className="w-full flex justify-center mt-4">
                                                                        <label className="max-w-full flex justify-center">
                                                                            <div className="bg-blue-800 h-10 w-10 rounded-xl flex justify-center items-center">
                                                                                <svg height="30" width="30" viewBox="0 0 24 24"><path d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z"/></svg><input type="file" className="hidden" onChange={e => handlePostPhotoChange(e)}/>
                                                                            </div> 
                                                                        </label>
                                                                    </div>}
                                                                </DialogDescription>
                                                                </DialogHeader>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Dialog>
                                                            <DialogTrigger className="w-full hover:bg-gray-100 dark:hover:bg-gray-800">Delete</DialogTrigger>
                                                            <DialogContent className="w-70">
                                                                <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription className="mt-5 mb-5">
                                                                    This action cannot be undone. This will permanently delete your post
                                                                    and remove it from our servers.   
                                                                </DialogDescription>
                                                                <Button onClick={() => {handleDeletePost(item.id)}}>Yes</Button>
                                                                </DialogHeader>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="wrap-break-word max-w-90">{item.content}</p>
                                        {item.image !== "http://localhost:3000/uploads/" && 
                                        <div className="max-w-90 pr-20">
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


                <div className="w-full flex flex-col items-center ml-2">
                    <div className="mt-4 w-full bg-white border border-gray-500 rounded-4xl dark:bg-gray-900 dark:border-0">
                        <h1 className="text-3xl text-center">User Reply</h1>
                    </div>
                    <div>
                    {userReply.map((item) => {
                        return (
                            <div className="w-full items-center justify-center" key={item.id}>
                            <Link to={`/post/${item.thread_id}`}>
                            <div className="min-h-40 bg-white flex border border-gray-400 dark:border-0 rounded-4xl m-5 shadow-xl dark:bg-gray-900">
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
                                            {item.creator_id === profile.id && 
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger >
                                                        <div className=" h-8 flex items-center rounded-4xl" onClick={(e) => {e.preventDefault()}}><svg className="dark:fill-gray-200" viewBox="0 0 512 512" width="20" height="20"><g><circle cx="256" cy="42.667" r="42.667"/><circle cx="256" cy="256" r="42.667"/><circle cx="256" cy="469.333" r="42.667"/></g></svg></div>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent onClick={(e) => {e.stopPropagation()}}>
                                                        <Dialog>
                                                            <DialogTrigger className="w-full hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setEditReply(item.content, item.image)}>Edit</DialogTrigger>
                                                            <DialogContent className="w-200">
                                                                <DialogHeader>
                                                                <DialogTitle className="text-2xl">Edit your post:</DialogTitle>
                                                                <DialogDescription>
                                                                    <div className="flex">
                                                                    <textarea className="rounded-2xl pl-3 pr-3 w-full text-gray-800 bg-gray-100 border-gray-400 border-2" value={editReplyContent} onChange={e => setEditReplyContent(e.target.value)}></textarea>
                                                                    <DialogTrigger><Button className="h-12 ml-3" onClick={() => {submitEditReply(item.id)}}>Edit Reply</Button></DialogTrigger>
                                                                    </div>
                                                                    {editReplyImage !== "http://localhost:3000/uploads/" && 
                                                                    <label className="max-w-full flex justify-center mt-4">
                                                                        <img src={editReplyImage} className="" alt="No image selected"></img>
                                                                        <input type="file" className="hidden" onChange={e => handleReplyPhotoChange(e)}/>
                                                                    </label>
                                                                    }
                                                                    {editReplyImage === "http://localhost:3000/uploads/" && 
                                                                    <div className="w-full flex justify-center mt-4">
                                                                        <label className="max-w-full flex justify-center">
                                                                            <div className="bg-blue-800 h-10 w-10 rounded-xl flex justify-center items-center">
                                                                                <svg height="30" width="30" viewBox="0 0 24 24"><path d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z"/></svg><input type="file" className="hidden" onChange={e => handleReplyPhotoChange(e)}/>
                                                                            </div> 
                                                                        </label>
                                                                    </div>}
                                                                </DialogDescription>
                                                                </DialogHeader>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <Dialog>
                                                            <DialogTrigger className="w-full hover:bg-gray-100 dark:hover:bg-gray-800">Delete</DialogTrigger>
                                                            <DialogContent className="w-70">
                                                                <DialogHeader>
                                                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                                                <DialogDescription className="mt-5 mb-5">
                                                                    This action cannot be undone. This will permanently delete your reply
                                                                    and remove it from our servers.   
                                                                </DialogDescription>
                                                                <Button onClick={() => {handleDeleteReply(item.id)}}>Yes</Button>
                                                                </DialogHeader>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="wrap-break-word max-w-90">{item.content}</p>
                                        {item.image !== "http://localhost:3000/uploads/" && 
                                        <div className="max-w-90 pr-20">
                                            <img src={item.image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                                        </div>}
                                    <div>
                                        <div className="flex items-end h-full flex-row-reverse mt-4">
                                        <div className="flex justify-center items-center mr-2 ml-5" id={"likeCount"+ item.id}>{repliesLikes.filter((count: Likes) => count.replie_id === item.id).length}</div>
                                        <svg viewBox="0 0 24 24" width="30" height="30" id={"likeReply"+ item.id} onClick={(e) => {e.stopPropagation(); handleLikeReply(e, item.id)}} className="fill-gray-700 hover:fill-red-500 active:fill-red-900"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>
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
        </div>
)}