import axios from "axios"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function PostCard() {
    const [userlikes, setUserLikes] = useState([])
    const [post, setPost] = useState([])
    const [errorStatus, setErrorStatus] = useState(false)
    const [allLikes, setAllLikes] = useState([])

    useState(
        async function getPost() {
        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        try {
            const response = await axios.get("http://localhost:3000/post/get", {headers})
            const post = response.data.data.post
            setErrorStatus(false)
            setPost(post)
            const likes = response.data.data.likes
            setAllLikes(likes)
            const token = response.data.data.decoded
            const userliked = likes.filter(like => like.user_id === token.id)
            setUserLikes(userliked)
        } catch (error) {
            return (setErrorStatus(true))
    }})

    useEffect(() => {
        userlikes.map((like) => {
            const target = document.getElementById("like" + like.thread_id)
            return (
        target?.classList.add("bg-red-900"))
            },
        allLikes.map((like) => {
            const target = document.getElementById("like" + like.thread_id)
            const likeCounts = allLikes.filter(count => count.thread_id === like.thread_id).length
        })
        )})

    const handleLike = async (e, id) => {
        e.preventDefault()
        
        console.log(document.getElementById("likeCount" + id)?.innerHTML)
        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        if (document.getElementById("like"+id)?.classList.contains("bg-red-900")){
            document.getElementById("like"+id)?.classList.remove("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/remove", {thread_id:id} ,{headers})

        } else {
            document.getElementById("like"+id)?.classList.add("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/add", {thread_id:id} ,{headers})
    }}

    return (
        <>
        {errorStatus && 
             <div className="w-full h-screen flex items-center justify-center">
                <div className="w-120 h-40 flex items-center justify-center bg-gray-600 border-4 border-gray-950">
                    <h1 className="font-extrabold text-4xl">Fail fetching threads</h1>
                </div>
            </div>}
        {post.map((item) => {
            return (
                <div>
                <Link to={`/postDetail/${item.id}`}>
                <div className="w-100% min-h-40 bg-gray-600 m-5 p-5 flex border border-gray-900" key={item.id}>
                    <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950">
                        <img src={item.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div  className="w-full ml-5">
                        <h1 className="font-medium text-2xl">{item.created_by}</h1>
                        <p className="wrap-break-word">{item.content}</p>
                        {item.image !== "http://localhost:3000/uploads/" && 
                        <div className="max-w-full">
                            <img src={item.image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                        </div>}
                        <div className="flex mt-8 flex-row-reverse ">
                            <div className="flex justify-center items-center mr-2 ml-5" id={"likeCount"+ item.id}>{allLikes.filter(count => count.thread_id === item.id).length}</div>
                            <Button className="w-20" id={"like"+ item.id} onClick={(e) => {e.stopPropagation(); handleLike(e, item.id)}}>Like</Button>
                            <Button className="w-20" id={"reply"+ item.id} onClick={(e) => {e.stopPropagation(); handleReply(e, item.id)}}>Reply</Button>
                        </div>
                    </div>
                </div>
                </Link>
                </div>
        )})}
        </>
    )
}
