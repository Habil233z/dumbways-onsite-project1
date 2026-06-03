import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

export default function Login() {

    if (localStorage.getItem("token")) {
        window.location.href = "/"
    }

    const handleClick = async e => {
        e.preventDefault()
        const response = await axios.post("http://localhost:3000/login", {emailOrUsername, password})
        localStorage.setItem("token", response.data.token)
        window.location.href = "/"
    }

    const [emailOrUsername, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("")
    
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="border-gray-800 border-2 h-100 w-200 bg-gray-200">
                <h1 className="text-center mt-8 text-4xl font-bold">Circle</h1>
                <h2 className="text-center mt-8 text-4xl">Login to Circle</h2>
                <form className="ml-5 mr-5">
                    <input type="text" placeholder="     Email or Username" className="h-10 bg-amber-100 w-full border-2 border-gray-600" value={emailOrUsername} onChange={e => setEmailOrUsername(e.target.value)}/>
                    <input type="text" placeholder="     Password" className="h-10 bg-amber-100 w-full border-2 border-gray-600" value={password} onChange={e => setPassword(e.target.value)}/>
                    <div className="flex items-center justify-center">
                    <Button onClick={handleClick}>Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}