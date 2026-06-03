import axios from "axios"
import { useState } from "react"
import Header from "./Header"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    const [post, setPost] = useState([])

    useState(
        async function getPost() {
        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        const response = await axios.get("http://localhost:3000/post", {headers})
        const post = response.data.data.post
        setPost(post)
    })

    return (
        <>
        <Header />
        <div className="h-screen flex justify-center items-center bg-gray-800">
            <div className="border-gray-800 border-2 h-100 w-200 bg-gray-200 pt-5">
                <h1 className="text-center font-bold text-6xl">Post</h1>
                <div className="flex flex-col justify-center items-center gap-4">
                {post.map((items) => {return <h1 className="text-4xl text-center">{items.content}</h1>})}
                </div>
            </div>
        </div>
        </>
    )
}