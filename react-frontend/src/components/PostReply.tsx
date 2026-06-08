import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "./ui/button"

export default function PostReply() {
    const [errorStatus, setErrorStatus] = useState(false)
    const [repliesLikes, setRepliesLikes] = useState([])
    const [postReply, setPostReply] = useState([])


    useState(
        async function getPost() {
        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        const {id} = useParams()
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
    )

    useEffect(() => {
        repliesLikes.map((like) => {
            const target = document.getElementById("likeReply" + like.replie_id)
            return (
        target?.classList.add("bg-red-900"))
            },
        repliesLikes.map((like) => {
            const target = document.getElementById("likeReply" + like.replie_id)
            const likeCounts = repliesLikes.filter(count => count.replie_id === like.replie_id).length
        })
    )})
    
    const handleLikeReply = async (e, id) => {
        e.preventDefault()
        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        if (document.getElementById("likeReply"+id)?.classList.contains("bg-red-900")){
            document.getElementById("likeReply"+id)?.classList.remove("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/replyRemove", {replie_id:id} ,{headers})

        } else {
            document.getElementById("likeReply"+id)?.classList.add("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/replyAdd", {replie_id:id} ,{headers})
    }}

    return (
    <>
        {postReply.map ((reply) => {
                return (
                    <div className="w-100% min-h-40 bg-gray-600 m-5 p-5 flex border-2 border-gray-900" key={reply.id}>
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