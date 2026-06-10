import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"

export default function CreatePost() {
    const [createForm, setCreateForm] = useState(false)
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    const handleSubmit = async () => {
        if (content === "") {
            return window.alert("Post must have a text")
        }
        try {
            const token = localStorage.getItem("token")||null
            if (selectedFile === null) {
                await axios.post("http://localhost:3000/post/create", {content}, {headers: {Authorization: `Bearer ${token}`}})
                window.alert("Post created")
                return window.location.href = "/post"
            }
                await axios.post("http://localhost:3000/post/create", {content, file:selectedFile}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
                window.alert("Post created")
                return window.location.href = "/post"
            
        } catch (error) {
            return window.alert("Not authenticated")
        }
    }

    return (
        <div className="fixed h-20 w-full bg-gray-200 border-t-2 border-gray-900 mt-500 inset-x-0 bottom-0 dark:bg-gray-900 dark:border-gray-700" id="createPost">
            <div className="flex items-center justify-center">
            <Button className="bg-gray-950 mt-5 dark:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700" onClick={e => setCreateForm(true)}>Create Post</Button>
            </div>
            {createForm && <div className="fixed inset-0 h-full w-ful bg-gray-950 opacity-50" onClick={e => setCreateForm(false)}></div>}
            {createForm && 
                <div className="fixed h-100 w-[50%] bg-gray-200 top-50  ml-[25%] mr-auto flex flex-col justify-center items-center border-4 border-gray-900 shadow-2xl dark:bg-gray-800">
                    <h1 className="font-bold text-4xl mb-5">Create Post</h1>
                    <input type="text" placeholder="Your Post Text" className="border-4 border-gray-900 bg-gray-300 overflow-hidden text-clip w-100 min-h-30 dark:bg-gray-700 pl-5" onChange={e => setContent(e.target.value)}/>
                    <input type="file" onChange={e => setSelectedFile(e.target.files[0])} accept="image/*" className="bg-gray-400 border-4 border-gray-900 mt-5 w-60 pl-5"/>
                    <div className="flex items-center justify-center">
                    <Button onClick={handleSubmit} className="bg-gray-950 text-gray-300 mt-5 h-10 w-18 dark:hover:bg-gray-900 dark:active:bg-gray-700">Post</Button>
                    </div>
                </div>}
        </div>
    )
}