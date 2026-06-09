import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "./ui/button"

export default function PostDetail() {
    const [errorStatus, setErrorStatus] = useState(false)
    const [repliesLikes, setRepliesLikes] = useState([])
    const [postReply, setPostReply] = useState([])

    const [mainThread, setMainThread] = useState({})
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}
    const {id} = useParams()

    async function getMainPost() {
        try {
            setErrorStatus(false)
            const response = await axios.get(`http://localhost:3000/post/mainPost/${id}`,{headers})
            setMainThread(response.data.data.mainThread)
        } catch (error) {
            console.log(error)
            setErrorStatus(true)
        }
        }

    async function getPostReply() {
        try {
            setErrorStatus(false)
            const response = await axios.get(`http://localhost:3000/post/reply/${id}`,{headers})
            setRepliesLikes(response.data.data.likesReply)
            setPostReply(response.data.data.postReply)
        } catch (error) {
            console.log(error)
            setErrorStatus(true)
        }
    }

    async function getRepliesLikes() {
        try {
            setErrorStatus(false)
            const response = await axios.get(`http://localhost:3000/post/reply/${id}`,{headers})
            setRepliesLikes(response.data.data.likesReply)
            const mapLikesReply = await response.data.data.likesReply.map((like) => {
            const target = document.getElementById("likeReply" + like.replie_id)
            target?.classList.add("bg-red-900")
            })
        } catch (error) {
            console.log(error)
            setErrorStatus(true)
        }
    }

    const handleLikeReply = async (e, id) => {
        if (document.getElementById("likeReply"+id)?.classList.contains("bg-red-900")){
            document.getElementById("likeReply"+id)?.classList.remove("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/replyRemove", {replie_id:id} ,{headers})
            getPostReply()
        } else {
            document.getElementById("likeReply"+id)?.classList.add("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/replyAdd", {replie_id:id} ,{headers})
            getPostReply()
        }}

    const handleSubmit = async e => {
        if (content === "") {
            return window.alert("Post must have a text")
        }
        try {
            const token = localStorage.getItem("token")||null
            if (selectedFile === null) {
                await axios.post("http://localhost:3000/post/createReply", {content, thread_id: mainThread.id}, {headers})
                getPostReply()
            }
                await axios.post("http://localhost:3000/post/createReply", {content, file:selectedFile, thread_id: mainThread.id}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
                getPostReply()
            
        } catch (error) {
            return window.alert("Not authenticated")
        }
    }

    useEffect(() => {
        getMainPost()
        getPostReply()
        getRepliesLikes()
    }, [])

    return (
    <>
        <div className="flex flex-col items-center">
                <div className="h-50 w-full flex bg-gray-600 border-b-2 border-gray-900">

                    <div className="h-50 w-30 mt-3 ml-3">
                        <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950">
                        <img src={mainThread.creator_photo_profile} className="object-none h-full" ></img>
                        </div>
                    </div>
                    </div>
                    <div className="h-50 w-full flex flex-col">
                        <h1 className="font-bold text-4xl mt-2">{mainThread.created_by}</h1>
                        <p className="wrap-break-word">{mainThread.content}</p>
                        {mainThread.image !== "http://localhost:3000/uploads/" && 
                        <div className="max-w-full">
                            <img src={mainThread.image} alt="Fail to load image" className=""/>    
                        </div>}
                    </div>
                </div>
                <div className="w-[80%] flex items-center justify-center">
                    <input type="text" className="bg-gray-400 w-[70%] h-10" onChange={e => setContent(e.target.value)}/>
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-500 mr-5">
                        <label>IMG<input type="file" accept="image/*" className="hidden" onChange={e => setSelectedFile(e.target.files[0])}/></label>
                    </div>
                    <Button className="bg-gray-950 text-gray-300 h-10" onClick={handleSubmit}>Post</Button>
                </div>
            </div>

        {postReply.map ((reply) => {
                return (
                <div className="w-100% min-h-40 bg-gray-600 m-5 p-5 flex border-2 border-gray-900 rounded-4xl" key={reply.id}>
                    <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center">
                        <img src={reply.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div  className="w-full ml-5">
                        <h1 className="font-medium text-2xl">{reply.created_by}</h1>
                        <p className="wrap-break-word">{reply.content}</p>
                        {reply.image !== "http://localhost:3000/uploads/" && 
                        <div className="max-w-full">
                            <img src={reply.image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                        </div>}
                        <div className="flex mt-8 flex-row-reverse">
                            <div className="flex justify-center items-center mr-2 ml-5" id={"likeCount"+ reply.id}>{repliesLikes.filter(count => count.replie_id === reply.id).length}</div>
                            <Button className="w-20" id={"likeReply"+ reply.id} onClick={(e) => {e.stopPropagation(); handleLikeReply(e, reply.id)}}>Like</Button>
                        </div>
                    </div>
                </div>
            )
        })}
    </>
    )
}