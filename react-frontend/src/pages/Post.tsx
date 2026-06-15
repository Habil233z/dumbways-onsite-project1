import axios from "axios"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import type { Post, Likes, Replies, Follow } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [image, setImage] = useState<string>("")

    function handleSelectImage(e: any) {
        const photo: string = URL.createObjectURL(e.target.files[0])
        setSelectedFile(e.target.files[0])
        setImage(photo)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault
        if (content === "") {
            return window.alert("Post must have a text")
        }
        try {
            if (selectedFile === null) {
                await axios.post("http://localhost:3000/post/create", {content}, {headers: {Authorization: `Bearer ${token}`}})
                getPost()
            } else {
                await axios.post("http://localhost:3000/post/create", {content, file:selectedFile}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
                getPost()
            }
        } catch (error) {
            return window.alert("Not authenticated")
        }
    }

    const [errorStatus, setErrorStatus] = useState<boolean>(false)
    const [post, setPost] = useState<Post[]>([])
    const [allLikes, setAllLikes] = useState<Likes[]>([])
    const [allReply, setAllReply] = useState<Replies[]>([])
    const [followedUsers, setFollowedUsers] = useState<Follow[]>([])

    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}
    const [userId, setUserId] = useState(0)

    const [editPostContent, setEditPostContent] = useState("")
    const [editPostImage, setEditPostImage] = useState("")
    const [editPostNewImage, setEditPostNewImage] = useState<File | null>(null)

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
        }}

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

    const handleDelete = async (id: number) => {
        await axios.post("http://localhost:3000/post/delete", {id} , {headers})
        getPost()
    }

    async function setFollowButton() {
        const response = await axios.get("http://localhost:3000/follow/getFollowing", {headers})
        const followersAlreadyFollow = response.data.data.userFollowed
        const thatPerson = followersAlreadyFollow.map((request: Follow) => request.id)
        setFollowedUsers(thatPerson)}

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
        getPost()
    }

    useEffect(() => {
        getPost()
        setTimeout(() => {
        setFollowButton()
        mapLikes()
        }, 10)
    }, [])
    document.getElementById("postSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("profilePadding")?.classList.add("hidden")
    document.getElementById("profileSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    return (
    <div className="h-screen w-full flex flex-col">
        <div className="w-full bg-gray-100 dark:bg-gray-950 dark:border-gray-700 flex justify-center" id="createPost">
            <div className="flex items-center justify-center mt-7">
                <div className="flex"> 
                    <div className="flex flex-col justify-center">
                    <textarea onChange={(e: any) => setContent(e.target.value)} className="mb-2 pl-5 pr-5 min-h-8 resize-y overflow-hidden field-sizing-content w-150 rounded-4xl mr-4 bg-white border border-gray-500 dark:bg-gray-700"></textarea>
                    {selectedFile !== null && 
                    <div>
                        <img src={image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                    </div>}
                    </div>
                    <div className="flex justify-center items-center w-12 h-12 bg-blue-700 border-2 border-gray-900 rounded-xl hover:bg-blue-800 hover:fill-gray-200 active:bg-blue-900 dark:bg-blue-800 dark:hover:bg-blue-700 dark:active:bg-blue-900">
                        <label className=""><svg height="30" width="30" viewBox="0 0 24 24"><path d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z"/></svg><input type="file" accept="image/*" className="hidden" onChange={(e: any) => handleSelectImage(e)}/></label>
                    </div>
                    <Button className="w-24 h-12 bg-gray-950 dark:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700" onClick={(e: any) => handleSubmit(e)}>Create Post</Button>
                </div>
            </div>
        </div>
        <div className="h-screen w-full flex flex-col items-center bg-gray-100 overflow-y-scroll dark:bg-gray-950">
            {errorStatus && 
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-120 h-40 flex items-center justify-center bg-gray-600 border-4 border-gray-950">
                        <h1 className="font-extrabold text-4xl">Fail fetching threads</h1>
                    </div>
                </div>}

            <div className="flex flex-col w-full items-center">
    
            <div className="overflow-y-scroll w-[70%] bg-gray-100 flex flex-col items-center rounded-4xl pb-40 dark:bg-gray-950">
            {post.map((item) => {
                return (
                    <div className="w-full items-center justify-center" key={item.id}>
                    <Link to={`/post/${item.id}`}>
                    <div className="w-100% min-h-40 bg-white flex border border-gray-900 rounded-4xl m-5 shadow-xl dark:bg-gray-900">
                        <div className="flex flex-col items-center">
                            <Link to={`/user/${item.creator_id}`}>
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950 mt-5 ml-5">
                                <img src={item.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                            </div>
                            </Link>
                            <div className="mt-2 ml-5">
                                {followedUsers.includes(item.creator_id as any) && item.creator_id !== userId &&  <Button className="h-10 dark:bg-gray-800 text-gray-200" id={"unfollowBtn" + item.creator_id} onClick={(e) => handleUnFollow(e, item.creator_id)}>Unfollow</Button>}
                                {!followedUsers.includes(item.creator_id as any) && item.creator_id !== userId && <Button className="h-10 dark:bg-gray-800 text-gray-200" id={"followBtn" + item.creator_id} onClick={(e) => handleFollow(e, item.creator_id)}>Follow</Button>}
                            </div>
                        </div>
                        <div  className="w-full ml-5">
                            <div className="flex">
                                <div>
                                    <h1 className="mt-2">{item.created_at}</h1>
                                    <h1 className="font-medium text-2xl">{item.created_by}</h1>
                                </div>
                                <div className="w-full flex flex-row-reverse mt-2 mr-5">
                                    {item.creator_id === userId && 
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
                                                        <DialogTrigger><Button className="h-12 ml-3" onClick={() => {submitEdit(item.id)}}>Edit Post</Button></DialogTrigger>
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
                                                    <Button onClick={() => {handleDelete(item.id)}}>Yes</Button>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>}
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
    </div>
    )
}
