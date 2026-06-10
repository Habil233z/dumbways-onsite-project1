import axios from "axios"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function PostCard() {
    const [post, setPost] = useState([])
    const [errorStatus, setErrorStatus] = useState(false)
    const [allLikes, setAllLikes] = useState([])

    const token = localStorage.getItem("token")||null
    const headers = {"Authorization" : `Bearer ${token}`}

    async function getPost() {
        try {
            setErrorStatus(false)
            const response = await axios.get("http://localhost:3000/post/get", {headers})
            setAllLikes(response.data.data.likes)
            setPost(response.data.data.post)
        } catch (error) {
            setErrorStatus(true)
    }}

    async function mapLikes() {
        try {
            setErrorStatus(false)
            const response = await axios.get(`http://localhost:3000/like/get`,{headers})
            setAllLikes(response.data.data.likes)
            const id = response.data.data.decoded.id
            const userLike = response.data.data.likes.filter(like => like.user_id === id)
            await userLike.map((like) => {
            const target = document.getElementById("like" + like.thread_id)
            return (
                target?.classList.add("fill-red-700")
            )
        })
        } catch (error) {
            console.log(error)
            setErrorStatus(true)
        }
        
    }

    const handleLike = async (e, id) => {
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

    useEffect(() => {
        getPost()
        setTimeout(() => {
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
  
        <div className="overflow-y-scroll w-[90%] bg-gray-100 flex flex-col items-center rounded-4xl pb-40 dark:bg-gray-950">
        {post.map((item) => {
            return (
                <div className="w-full items-center justify-center" key={item.id}>
                <Link to={`/postDetail/${item.id}`}>
                <div className="w-100% min-h-40 bg-white flex border border-gray-900 rounded-4xl m-5 shadow-xl dark:bg-gray-900">
                    <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950 mt-5 ml-2">
                        <img src={item.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    <div  className="w-full ml-5">
                        <h1 className="mt-2">{item.created_at}</h1>
                        <h1 className="font-medium text-2xl">{item.created_by}</h1>
                        <p className="wrap-break-word">{item.content}</p>
                        {item.image !== "http://localhost:3000/uploads/" && 
                        <div className="max-w-full">
                            <img src={item.image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                        </div>}
                        <div className="flex mt-8 flex-row-reverse pb-5">
                            <div className="flex justify-center items-center mr-5 ml-2" id={"likeCount"+ item.id}>{allLikes.filter(count => count.thread_id === item.id).length}</div>
                            <svg viewBox="0 0 24 24" width="30" height="30" id={"like"+ item.id} onClick={(e) => {e.stopPropagation(); handleLike(e, item.id)}} className="fill-gray-700 hover:fill-red-500 active:fill-red-900"><path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"/></svg>
                            <Button className="w-20 mr-5" id={"reply"+ item.id}>Reply</Button>
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
