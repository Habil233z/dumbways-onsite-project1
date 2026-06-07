import axios from "axios"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function PostCard() {
    const [userlikes, setUserLikes] = useState([])
    const [post, setPost] = useState([])
    const [errorStatus, setErrorStatus] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [allLikes, setAllLikes] = useState([])

    const [likes, setLikes] = useState([])
    const [mainThread, setMainThread] = useState({})
    const [decoded, setDecoded] = useState({})
    const [postReply, setPostReply] = useState([])

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
            
            console.log(likeCounts)
            console.log(target)
        })
        )})

    const handleLike = async (e, id) => {

        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        if (document.getElementById("like"+id)?.classList.contains("bg-red-900")){
            document.getElementById("like"+id)?.classList.remove("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/remove", {thread_id:id} ,{headers})

        } else {
            document.getElementById("like"+id)?.classList.add("bg-red-900")
            const response = await axios.post("http://localhost:3000/like/add", {thread_id:id} ,{headers})
    }}
    
        const handleLikeReply = async (e, id) => {

        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        //if (document.getElementById("like"+id)?.classList.contains("bg-red-900")){
        //    document.getElementById("like"+id)?.classList.remove("bg-red-900")
        //    const response = await axios.post("http://localhost:3000/like/remove", {thread_id:id} ,{headers})

        //} else {
        //    document.getElementById("like"+id)?.classList.add("bg-red-900")
        //    const response = await axios.post("http://localhost:3000/like/add", {thread_id:id} ,{headers})
        //}
        }

    const handleClickThread = async (e, id) => {
        setShowDetail(true)
        document.getElementById("createPost")?.classList.add("hidden")
        document.body.classList.add("overflow-hidden");
        document.getElementById("createPost")?.classList.remove("fixed")
        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        try {
            const response = await axios.post("http://localhost:3000/post/reply", {thread: id },{headers})
            setLikes(response.data.data.likes)
            setMainThread(response.data.data.mainThread)
            setDecoded(response.data.data.decoded)
            setPostReply(response.data.data.postReply)
        } catch (error) {
            console.log(error)
        }
        
    }

    function handleOutsideClick() {
    document.getElementById("createPost")?.classList.remove("hidden")
    document.body.classList.remove("overflow-hidden");
    document.getElementById("createPost")?.classList.add("fixed")
    setShowDetail(false)
    }

    function ThreadDetail() {
        return (
        <>
        <div className="fixed inset-0 h-screen w-screen bg-gray-950 opacity-50" onClick={handleOutsideClick}></div>
            <div className="fixed h-max-186 w-[50%] bg-gray-500 top-19  ml-[-1%] mr-auto flex flex-col items-center border-4 border-gray-900">
                <div className="h-50 w-full flex bg-gray-600 border-b-2 border-gray-900">
                    <div className="h-50 w-30 mt-3 ml-3">
                        <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950">
                        <img src={mainThread.creator_photo_profile} className="object-none h-full" onClick={(e) => {e.stopPropagation()}}></img>
                        </div>
                    </div>
                    </div>
                    <div className="h-50 w-full flex flex-col">
                        <h1 className="font-bold text-4xl mt-2">{mainThread.created_by}</h1>
                        <p className="wrap-break-word">{mainThread.content}</p>
                        {mainThread.image !== "http://localhost:3000/uploads/" && 
                        <div className="max-w-full">
                            <img src={mainThread.image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                        </div>}

                    </div>
                </div>

                <div className="w-230 overflow-auto">
                    {postReply.length === 0 && 
                    <div className="h-20 bg-gray-800 mt-5 mb-5 flex justify-center items-center border-2 border-gray-900">
                        <div className="bg-gray-400 border-2 border-gray-900">
                            <h1 className="font-medium text-4xl p-2">This post has no reply</h1>
                        </div>
                    </div>}
                    {postReply.map((reply) => {
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
                            <Button className="w-20" id={"likeReply"+ reply.id} onClick={(e) => {e.stopPropagation(); handleLikeReply(e, reply.id)}}>Like</Button>
                        </div>
                    </div>
                </div>
                        )
                    })}
                </div>
        </div>
        </>
        )
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
                <div className="w-100% min-h-40 bg-gray-600 m-5 p-5 flex border border-gray-900" key={item.id} onClick={(e)=> handleClickThread(e, item.id)}>
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
                        <div className="flex mt-8 flex-row-reverse">
                            <Button className="w-20" id={"like"+ item.id} onClick={(e) => {e.stopPropagation(); handleLike(e, item.id)}}>Like</Button>
                            <Button className="w-20" id={"reply"+ item.id} onClick={(e) => {e.stopPropagation(); handleReply(e, item.id)}}>Reply</Button>
                        </div>
                    </div>
                </div>
        )})}
        {showDetail && <ThreadDetail />}
        </>
    )
}
