import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "../components/ui/button"
import type { Follow, Likes, Post, Replies, RepliesLike } from "@/types"
import { DropdownMenuTrigger, DropdownMenuContent,  DropdownMenu } from "../components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function PostDetail() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    const navigate = useNavigate()
    const [repliesLikes, setRepliesLikes] = useState<Likes[]>([])
    const [postReply, setPostReply] = useState<Replies[]>([])

    const [mainThread, setMainThread] = useState<Post>({} as Post)
    const [mainLike, setMainLike] = useState<Likes[]>([])
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [followedUsers, setFollowedUsers] = useState<Follow[]>([])
    const [userId, setUserId] = useState<number>(0)

    const [editPostContent, setEditPostContent] = useState("")
    const [editPostImage, setEditPostImage] = useState("")
    const [editPostNewImage, setEditPostNewImage] = useState<File | null>(null)

    const [editReplyContent, setEditReplyContent] = useState("")
    const [editReplyImage, setEditReplyImage] = useState("")
    const [editReplyNewImage, setEditReplyNewImage] = useState<File | null>(null)

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

        const handleDeleteReply = async (id: number) => {
            await axios.post("http://localhost:3000/post/deleteReply", {id} , {headers})
            getPostReply()
        }

        const handleDeleteMainThread = async (id: number) => {
            await axios.post("http://localhost:3000/post/delete", {id} , {headers})
            navigate("/post")
        }

        function setEditPost(content: string, image: string) {
        setEditPostContent(content)
        setEditPostImage(image)
        }

        function handlePhotoChange(e: any) {
        const photo: string = URL.createObjectURL(e.target.files[0])
        setEditPostNewImage(e.target.files[0])
        setEditPostImage(photo)
        }

        async function submitEdit(id: number) {
        await axios.put("http://localhost:3000/post/edit", {content: editPostContent, file: editPostNewImage, id}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
        getMainPost()
        }
        
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
        getPostReply()
        }

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
                                    <div className="flex flex-col items-center mr-4">
                                    <Link to={`/user/${mainThread.creator_id}`}>
                                    <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950 mt-1 ">
                                        <img src={mainThread.creator_photo_profile} className="object-none h-full" ></img>
                                    </div>
                                    </Link>
                                    <div className="mt-4">
                                        {followedUsers.includes(mainThread.creator_id as any) && mainThread.creator_id !== userId &&  <Button className="h-10" id={"unfollowBtn" + mainThread.creator_id} onClick={(e) => handleUnFollow(e, mainThread)}>Unfollow</Button>}
                                        {!followedUsers.includes(mainThread.creator_id as any) && mainThread.creator_id !== userId && <Button className="h-10" id={"followBtn" + mainThread.creator_id} onClick={(e) => handleFollow(e, mainThread)}>Follow</Button>}
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
                                <div className="flex flex-col items-end min-h-50 pr-8 flex-1 mt-5">
                                    {mainThread.creator_id === userId && 
                                    <DropdownMenu>
                                        <DropdownMenuTrigger >
                                            <div className=" h-8 flex items-center rounded-4xl" onClick={(e) => {e.preventDefault()}}><svg className="dark:fill-gray-200" viewBox="0 0 512 512" width="20" height="20"><g><circle cx="256" cy="42.667" r="42.667"/><circle cx="256" cy="256" r="42.667"/><circle cx="256" cy="469.333" r="42.667"/></g></svg></div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent onClick={(e) => {e.stopPropagation()}}>
                                            <Dialog>
                                                <DialogTrigger className="w-full hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setEditPost(mainThread.content, mainThread.image)}>Edit</DialogTrigger>
                                                <DialogContent className="w-200">
                                                    <DialogHeader>
                                                    <DialogTitle className="text-2xl">Edit your post:</DialogTitle>
                                                    <DialogDescription>
                                                        <div className="flex">
                                                        <textarea className="rounded-2xl pl-3 pr-3 w-full text-gray-800 bg-gray-100 border-gray-400 border-2" value={editPostContent} onChange={e => setEditPostContent(e.target.value)}></textarea>
                                                        <DialogTrigger><Button className="h-12 ml-3" onClick={() => {submitEdit(mainThread.id)}}>Edit Post</Button></DialogTrigger>
                                                        </div>
                                                        {editPostImage !== "http://localhost:3000/uploads/" && 
                                                         <label className="max-w-full flex justify-center mt-4">
                                                            <img src={editPostImage} className="" alt="No image selected"></img>
                                                            <input type="file" className="hidden" onChange={e => handlePhotoChange(e)}/>
                                                        </label>
                                                        }
                                                        {editPostImage === "http://localhost:3000/uploads/" && 
                                                        <div className="w-full flex justify-center mt-4">
                                                            <label className="max-w-full flex justify-center">
                                                                <div className="bg-blue-800 h-10 w-10 rounded-xl flex justify-center items-center">
                                                                    <svg height="30" width="30" viewBox="0 0 24 24"><path d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z"/></svg><input type="file" className="hidden" onChange={e => handlePhotoChange(e)}/>
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
                                                    <Button onClick={() => {handleDeleteMainThread(mainThread.id)}}>Yes</Button>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>}
                                    <div className="flex flex-row-reverse h-full items-end">
                                        <div className="mb-5 ml-4" id={"likeCount"}>{mainLike.length}</div>
                                        <svg viewBox="0 0 24 24" width="30" height="30" id={"like"+ mainThread.id} onClick={(e) => {e.stopPropagation(); handleLike(e, mainThread.id)}}  className="mb-4 fill-gray-700 hover:fill-red-500 active:fill-red-900"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center mt-2">
                                <textarea className="bg-gray-100 w-[80%] h-12 border-2 border-gray-900 dark:bg-gray-700 pl-5 mr-4 rounded-4xl" onChange={e => setContent(e.target.value)}/>
                                <div className="flex justify-center items-center w-12 h-12 bg-blue-700 dark:bg-blue-800 mr-2 border-2 border-l-0 border-gray-900 hover:bg-blue-800 active:bg-blue-900 rounded-xl dark:hover:bg-blue-900 dark:active:bg-blue-950">
                                    <label>
                                    <svg height="30" width="30" viewBox="0 0 24 24"><path d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z"/></svg>
                                    <input type="file" accept="image/*" className="hidden" onChange={(e: any) => setSelectedFile(e.target.files[0])}/></label>
                                </div>
                                <Button className="bg-gray-950 text-gray-300 h-12 dark:bg-gray-800 dark:hover:bg-gray-900 dark:active:bg-gray-700" onClick={handleSubmit}>Post</Button>
                            </div>
                        </div>
                    <div className="h-full flex flex-col items-center">
                    {postReply.map ((reply) => {
                            return (
                            <div className="w-[80%] min-h-40 bg-white m-5 p-5 flex border-2 border-gray-400 dark:border-0 rounded-4xl dark:bg-gray-900" key={reply.id}>
                                <div className="flex flex-col items-center">
                                    <Link to={`/user/${reply.creator_id}`}>
                                    <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center">
                                        <img src={reply.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                                    </div>
                                    </Link>
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
                                            <div className=" h-8 flex items-center rounded-4xl" onClick={(e) => {e.preventDefault()}}><svg className="dark:fill-gray-200" viewBox="0 0 512 512" width="20" height="20"><g><circle cx="256" cy="42.667" r="42.667"/><circle cx="256" cy="256" r="42.667"/><circle cx="256" cy="469.333" r="42.667"/></g></svg></div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent onClick={(e) => {e.stopPropagation()}}>
                                            <Dialog>
                                                <DialogTrigger className="w-full hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setEditReply(reply.content, reply.image)}>Edit</DialogTrigger>
                                                <DialogContent className="w-200">
                                                    <DialogHeader>
                                                    <DialogTitle className="text-2xl">Edit your post:</DialogTitle>
                                                    <DialogDescription>
                                                        <div className="flex">
                                                        <textarea className="rounded-2xl pl-3 pr-3 w-full text-gray-800 bg-gray-100 border-gray-400 border-2" value={editReplyContent} onChange={e => setEditReplyContent(e.target.value)}></textarea>
                                                        <DialogTrigger><Button className="h-12 ml-3" onClick={() => {submitEditReply(reply.id)}}>Edit Post</Button></DialogTrigger>
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
                                                        This action cannot be undone. This will permanently delete your post
                                                        and remove it from our servers.   
                                                    </DialogDescription>
                                                    <Button onClick={() => {handleDeleteReply(reply.id)}}>Yes</Button>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
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