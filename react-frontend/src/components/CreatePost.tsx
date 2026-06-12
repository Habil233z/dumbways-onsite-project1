import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"

export default function CreatePost() {
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
        <div className="h-screen w-full bg-gray-100 dark:bg-gray-950 dark:border-gray-700 flex justify-center" id="createPost">
            <div className="flex items-center justify-center mt-7">
                <div className="flex"> 
                    <div className="flex flex-col justify-center">
                    <textarea onChange={(e: any) => setContent(e.target.value)} className="mb-2 pl-5 pr-5 min-h-8 resize-y overflow-hidden field-sizing-content w-150 rounded-4xl mr-4 bg-white border border-gray-500 dark:bg-gray-900"></textarea>
                    {selectedFile !== null && 
                    <div>
                        <img src={image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                    </div>}
                    </div>
                    <div className="flex justify-center items-center w-12 h-12 bg-gray-600 border-2 border-gray-900 rounded-xl hover:bg-gray-700 active:bg-gray-900 dark:bg-gray-950 dark:hover:bg-gray-700 dark:active:bg-gray-800">
                        <label className="text-gray-200"><svg className="h-6 w-6" viewBox="0 0 24 24"><path d="m13,20.5c0,.276-.224.5-.5.5H4.5c-2.481,0-4.5-2.019-4.5-4.5V4.5C0,2.019,2.019,0,4.5,0h12c2.481,0,4.5,2.019,4.5,4.5v8c0,.276-.224.5-.5.5s-.5-.224-.5-.5V4.5c0-1.93-1.57-3.5-3.5-3.5H4.5c-1.93,0-3.5,1.57-3.5,3.5v8.336l3.811-3.811c1.322-1.322,3.628-1.322,4.95,0l7.094,7.122c.195.195.194.512,0,.707-.098.097-.226.146-.353.146-.128,0-.256-.049-.354-.147l-7.094-7.121c-.943-.943-2.591-.944-3.535,0L1,14.25v2.25c0,1.93,1.57,3.5,3.5,3.5h8c.276,0,.5.224.5.5Zm4-15c0,1.379-1.122,2.5-2.5,2.5s-2.5-1.121-2.5-2.5,1.122-2.5,2.5-2.5,2.5,1.121,2.5,2.5Zm-1,0c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5,1.5.673,1.5,1.5,1.5,1.5-.673,1.5-1.5Zm7.5,13.5h-3.5v-3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3.5h-3.5c-.276,0-.5.224-.5.5s.224.5.5.5h3.5v3.5c0,.276.224.5.5.5s.5-.224.5-.5v-3.5h3.5c.276,0,.5-.224.5-.5s-.224-.5-.5-.5Z"/></svg><input type="file" accept="image/*" className="hidden" onChange={(e: any) => handleSelectImage(e)}/></label>
                    </div>
                    <Button className="w-24 h-12 bg-gray-950 dark:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700" onClick={(e: any) => handleSubmit(e)}>Create Post</Button>
                </div>
            </div>
        </div>
    )
}