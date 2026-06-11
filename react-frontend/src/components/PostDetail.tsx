import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Button } from "./ui/button"

export default function PostDetail() {
    const [repliesLikes, setRepliesLikes] = useState([])
    const [postReply, setPostReply] = useState([])

    const [mainThread, setMainThread] = useState({})
    const [mainLike, setMainLike] = useState([])
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}
    const {id} = useParams()

    async function getMainPost() {
        try {
            const response = await axios.get(`http://localhost:3000/post/mainPost/${id}`,{headers})
            setMainThread(response.data.data.mainThread)
            setMainLike(response.data.data.mainLike)
        } catch (error) {
            console.log(error)
        }
        }

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
            await response.data.data.likesReply.map((like) => {
            document.getElementById("likeReply" + like.replie_id)?.classList.add("fill-red-700")
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function applyMainLikes() {
        if (mainLike.filter(state => state.thread_id === mainThread.id)) {
            document.getElementById("like" + mainThread.id)?.classList.add("fill-red-700")
        }
        
    }

    const handleLike = async (e, id) => {
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

    const handleLikeReply = async (e, id) => {
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
        }
    }

    useEffect(() => {
        getMainPost()
        getPostReply()
        getRepliesLikes()
        applyMainLikes()
        setTimeout(() => {
            getRepliesLikes()
            applyMainLikes()
        }, 100)
    }, [])

    return (
    <div className="h-screen w-full flex flex-col items-center">
        <div className="w-full flex">
        <Link to="/post"><div className="h-15 w-20 bg-gray-200 rounded-br-4xl dark:bg-gray-900 flex justify-center items-center"><svg viewBox="0 0 24 24" width="30" height="30"><path className="dark:fill-gray-400" d="M19,11H9l3.29-3.29a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0l-4.29,4.3A2,2,0,0,0,6,12H6a2,2,0,0,0,.59,1.4l4.29,4.3a1,1,0,1,0,1.41-1.42L9,13H19a1,1,0,0,0,0-2Z"/></svg></div></Link>
        </div>
    <div className="pt-10 pb-20 w-[90%]">
        <div className="flex flex-col items-center">
                <div className="h-50 w-full flex bg-white border border-gray-900 rounded-4xl dark:bg-gray-900">
                    <div className="h-50 w-30 mt-3 ml-3">
                        <div className="flex">
                        <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950 mt-2 ml-2">
                            <img src={mainThread.creator_photo_profile} className="object-none h-full" ></img>
                        </div>
                    </div>
                    </div>
                    <div className="h-50 w-full flex flex-col">
                        <h1 className="mt-2">{mainThread.created_at}</h1>
                        <h1 className="font-bold text-4xl mt-2">{mainThread.created_by}</h1>
                        <p className="wrap-break-word">{mainThread.content}</p>
                        {mainThread.image !== "http://localhost:3000/uploads/" && 
                        <div className="max-w-full">
                            <img src={mainThread.image} alt="Fail to load image" className=""/>    
                        </div>}
                        <div className="flex flex-row-reverse items-end h-full w-full">
                            <div className="mb-7 ml-4 mr-6" id={"likeCount"}>{mainLike.length}</div>
                            <svg viewBox="0 0 24 24" width="30" height="30" id={"like"+ mainThread.id} onClick={(e) => {e.stopPropagation(); handleLike(e, mainThread.id)}}  className="mb-6 fill-gray-700 hover:fill-red-500 active:fill-red-900"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>
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
                        <input type="file" accept="image/*" className="hidden" onChange={e => setSelectedFile(e.target.files[0])}/></label>
                    </div>
                    <Button className="bg-gray-950 text-gray-300 h-10 dark:bg-gray-800 dark:hover:bg-gray-900 dark:active:bg-gray-700" onClick={handleSubmit}>Post</Button>
                </div>
            </div>
        <div className="h-full flex flex-col items-center">
        {postReply.map ((reply) => {
                return (
                <div className="w-[90%] min-h-40 bg-white m-5 p-5 flex border-2 border-gray-900 rounded-4xl dark:bg-gray-900" key={reply.id}>
                    <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center">
                        <img src={reply.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div  className="w-full ml-5">
                        <h1 className="font-medium text-2xl">{reply.created_by}</h1>
                        <p className="wrap-break-word">{reply.content}</p>
                        {reply.image !== "http://localhost:3000/uploads/" && 
                        <div className="">
                            <img className="max-h-50" src={reply.image} alt="Fail to load image" onClick={(e) => {e.stopPropagation()}}/>    
                        </div>}
                        <div className="flex mt-8 flex-row-reverse">
                            <div className="flex justify-center items-center mr-2 ml-5" id={"likeCount"+ reply.id}>{repliesLikes.filter(count => count.replie_id === reply.id).length}</div>
                            <svg viewBox="0 0 24 24" width="30" height="30" id={"likeReply"+ reply.id} onClick={(e) => {e.stopPropagation(); handleLikeReply(e, reply.id)}} className="fill-gray-700 hover:fill-red-500 active:fill-red-900"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>
                        </div>
                    </div>
                </div>
            )
        })}
        </div>
    </div>
    </div>
    )
}