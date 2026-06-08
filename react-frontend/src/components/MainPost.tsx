import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "./ui/button"

export default function MainPost() {
    const [errorStatus, setErrorStatus] = useState(false)
    const [likes, setLikes] = useState([])
    const [mainThread, setMainThread] = useState({})
    const [content, setContent] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    useState(
        async function getPost() {
        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        const {id} = useParams()
        try {
            setErrorStatus(false)
            const response = await axios.get(`http://localhost:3000/post/mainPost/${id}`,{headers})
            setMainThread(response.data.data.mainThread)
            console.log(response.data.data.mainThread)
        } catch (error) {
            console.log(error)
            setErrorStatus(true)
        }
        }
    )

    const handleSubmit = async e => {
        if (content === "") {
            return window.alert("Post must have a text")
        }
        try {
            const token = localStorage.getItem("token")||null
            if (selectedFile === null) {
                await axios.post("http://localhost:3000/post/createReply", {content, thread_id: mainThread.id}, {headers: {Authorization: `Bearer ${token}`}})
                window.alert("Reply created")
                return window.location.href = `/postDetail/${mainThread.id}`
            }
                await axios.post("http://localhost:3000/post/createReply", {content, file:selectedFile, thread_id: mainThread.id}, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}})
                window.alert("Reply created")
                return window.location.href = `/postDetail/${mainThread.id}`
            
        } catch (error) {
            return window.alert("Not authenticated")
        }
    }

        return (
            <> 
           {errorStatus && 
             <div className="w-full h-screen flex items-center justify-center">
                <div className="w-120 h-40 flex items-center justify-center bg-gray-600 border-4 border-gray-950">
                    <h1 className="font-extrabold text-4xl">Fail fetching Main thread</h1>
                </div>
            </div>}

            <div className="flex flex-col items-center">
                <div className="h-50 w-full flex bg-gray-600 border-b-2 border-gray-900">

                    <div className="h-50 w-30 mt-3 ml-3">
                        <div className="flex">
                            <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center border-2 border-gray-950">
                        <img src={mainThread.creator_photo_profile} className="object-none h-full" ></img>
                        </div>
                    </div>
                    </div>
                    <div className="h-50 w-full flex flex-col">
                        <h1 className="font-bold text-4xl mt-2">{mainThread.created_by}</h1>
                        <p className="wrap-break-word">{mainThread.content}</p>
                        {mainThread.image !== "http://localhost:3000/uploads/" && 
                        <div className="max-w-full">
                            <img src={mainThread.image} alt="Fail to load image" className=""/>    
                        </div>}
                    </div>
                </div>
                <div className="w-[80%] flex items-center justify-center">
                    <input type="text" className="bg-gray-400 w-[70%] h-10" onChange={e => setContent(e.target.value)}/>
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-500 mr-5">
                        <label>IMG<input type="file" accept="image/*" className="hidden" onChange={e => setSelectedFile(e.target.files[0])}/></label>
                    </div>
                    <Button className="bg-gray-950 text-gray-300 h-10" onClick={handleSubmit}>Post</Button>
                </div>
            </div>
        </>
        )
    }