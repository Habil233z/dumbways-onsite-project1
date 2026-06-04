import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CreatePost() {
    const [createForm, setCreateForm] = useState(false)
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    function handleCreateButton() {
        setCreateForm(true)
    }
    function handleOutsideClick() {
        setCreateForm(false)
    }

    const fileSelectHandler = (e) => {
        setSelectedFile(e.target.files[0])
        console.log(e.target.files[0])
    }

    return (
        <div className="fixed h-20 w-full bg-gray-800 border-t-4 border-gray-900 mt-500 inset-x-0 bottom-0">
            <div className="flex items-center justify-center">
            <Button className="bg-gray-950 mt-5" onClick={handleCreateButton}>Create Post</Button>
            </div>
            {createForm && <div className="fixed inset-0 h-full w-ful bg-gray-950 opacity-50" onClick={handleOutsideClick}></div>}
            {createForm && 
                <div className="fixed h-100 w-[50%] bg-gray-500 top-50  ml-[25%] mr-auto flex flex-col justify-center items-center border-4 border-gray-900">
                    <h1 className="font-bold text-4xl">Create Post</h1>
                    <input type="text" placeholder="Your Post Text" className="border-4 border-gray-900 bg-gray-400 overflow-hidden text-clip w-100 min-h-30" onChange={e => setContent(e.target.value)}/>
                    <input type="file" onChange={fileSelectHandler} accept="image/*" className="bg-gray-400 border-4 border-gray-900 mt-5 w-60 pl-5"/>
                </div>}
        </div>
    )
}