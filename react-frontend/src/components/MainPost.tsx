import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function MainPost() {
    const [errorStatus, setErrorStatus] = useState(false)
    const [likes, setLikes] = useState([])
    const [mainThread, setMainThread] = useState({})

    useState(
        async function getPost() {
        const token = localStorage.getItem("token")||null
        const headers = {"Authorization" : `Bearer ${token}`}
        const {id} = useParams()
        try {
            setErrorStatus(false)
            const response = await axios.get(`http://localhost:3000/post/mainPost/${id}`,{headers})
            setMainThread(response.data.data.mainThread)
        } catch (error) {
            console.log(error)
            setErrorStatus(true)
        }
        }
    )

        return (
            <> 
           {errorStatus && 
             <div className="w-full h-screen flex items-center justify-center">
                <div className="w-120 h-40 flex items-center justify-center bg-gray-600 border-4 border-gray-950">
                    <h1 className="font-extrabold text-4xl">Fail fetching Main thread</h1>
                </div>
            </div>}

            <div className="">
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
        </div>
        </>
        )
    }