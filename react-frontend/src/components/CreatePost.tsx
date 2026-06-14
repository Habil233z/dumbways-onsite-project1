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
                return window.location.href = "/post"
            }
                await axios.post("http://localhost:3000/post/create", {content, file:selectedFile}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
                return window.location.href = "/post"
            
        } catch (error) {
            return window.alert("Not authenticated")
        }
    }

    return (
        <div className="w-full bg-gray-100 dark:bg-gray-950 dark:border-gray-700 flex justify-center" id="createPost">
            <div className="flex items-center justify-center mt-7">
                <div className="flex"> 
                    <div className="flex flex-col justify-center">
                    <textarea onChange={(e: any) => setContent(e.target.value)} className="mb-2 pl-5 pr-5 min-h-8 resize-y overflow-hidden field-sizing-content w-150 rounded-4xl mr-4 bg-white border border-gray-500 dark:bg-gray-700"></textarea>
                    {selectedFile !== null && 
                    <div>
                        <img src={image} alt="Fail to load image" className="" onClick={(e) => {e.stopPropagation()}}/>    
                    </div>}
                    </div>
                    <div className="flex justify-center items-center w-12 h-12 bg-blue-700 border-2 border-gray-900 rounded-xl hover:bg-blue-800 hover:fill-gray-200 active:bg-blue-900 dark:bg-blue-800 dark:hover:bg-blue-700 dark:active:bg-blue-900">
                        <label className=""><svg height="30" width="30" viewBox="0 0 24 24"><path d="m12,21c0,.553-.448,1-1,1h-6c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h12c2.757,0,5,2.243,5,5v6c0,.553-.448,1-1,1s-1-.447-1-1v-6c0-1.654-1.346-3-3-3H5c-1.654,0-3,1.346-3,3v6.959l2.808-2.808c1.532-1.533,4.025-1.533,5.558,0l5.341,5.341c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-5.341-5.341c-.752-.751-1.976-.752-2.73,0l-4.222,4.222v2.213c0,1.654,1.346,3,3,3h6c.552,0,1,.447,1,1ZM15,3.5c1.654,0,3,1.346,3,3s-1.346,3-3,3-3-1.346-3-3,1.346-3,3-3Zm0,2c-.551,0-1,.448-1,1s.449,1,1,1,1-.448,1-1-.449-1-1-1Zm8,12.5h-3v-3c0-.553-.448-1-1-1s-1,.447-1,1v3h-3c-.552,0-1,.447-1,1s.448,1,1,1h3v3c0,.553.448,1,1,1s1-.447,1-1v-3h3c.552,0,1-.447,1-1s-.448-1-1-1Z"/></svg><input type="file" accept="image/*" className="hidden" onChange={(e: any) => handleSelectImage(e)}/></label>
                    </div>
                    <Button className="w-24 h-12 bg-gray-950 dark:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700" onClick={(e: any) => handleSubmit(e)}>Create Post</Button>
                </div>
            </div>
        </div>
    )
}