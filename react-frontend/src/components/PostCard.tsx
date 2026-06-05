import axios from "axios"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function PostCard() {
    const [userlikes, setUserLikes] = useState([])
    const [post, setPost] = useState([])
    const [errorStatus, setErrorStatus] = useState(false)

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
            })})

    const handleLike = async (e, id) => {

        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        if (document.getElementById("like"+id)?.classList.contains("bg-red-900")){
            document.getElementById("like"+id)?.classList.remove("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/remove", {thread_id:id} ,{headers})
            console.log(response)
            console.log("already clicked")

        } else {
            document.getElementById("like"+id)?.classList.add("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/add", {thread_id:id} ,{headers})
            console.log(response)
    }}

    const handleReply = async (e, id) => {
        e.preventDefault
    }

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
                <div className="w-100% min-h-40 bg-gray-600 m-5 p-5 flex border-2 border-gray-900" key={item.id} onClick={() => alert("clicked")}>
                    <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center">
                        <img src={item.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div  className="w-full ml-5">
                        <h1 className="font-medium text-2xl">{item.created_by}</h1>
                        <p className="wrap-break-word">{item.content}</p>
                        {item.image && 
                        <div>
                            <img src={item.image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                        </div>}
                        <div className="flex mt-8 flex-row-reverse">
                            <Button className="w-20" id={"like"+ item.id} onClick={(e) => {e.stopPropagation(); handleLike(e, item.id)}}>Like</Button>
                            <Button className="w-20" id={"reply"+ item.id} onClick={(e) => {e.stopPropagation(); handleReply(e, item.id)}}>Reply</Button>
                        </div>
                    </div>
                </div>
        )})}
        </>
    )
}
