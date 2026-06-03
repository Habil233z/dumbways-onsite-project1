import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    if (localStorage.getItem("token")) {
        window.location.href = "/"
    }

    async function handleClick(e) {
        try {
            if (emailOrUsername === "" || password === "") {
                window.alert("Box must be filled")
                window.location.href = "/login"
            }
            e.preventDefault()
            const response = await axios.post("http://localhost:3000/login", {emailOrUsername, password})
            localStorage.setItem("token", response.data.token)
            window.location.href = "/"
        } catch (error) {
            return window.alert("User doesn't exist or password wrong")
        }
    }

    const [emailOrUsername, setEmailOrUsername] = useState("")
    const [password, setPassword] = useState("")
    
    return (
        <div className="h-screen flex justify-center items-center bg-gray-900">
            <div className="border-gray-800 border-2 h-100 w-200 bg-gray-700">
                <h1 className="text-center mt-8 text-4xl font-extrabold text-green-600">Circle</h1>
                <h2 className="text-center mt-8 text-4xl mb-5 text-gray-950 font-medium">Login to Circle</h2>
                <form className="ml-5 mr-5">
                    <input type="text" placeholder="Email or Username" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-4 mb-5" value={emailOrUsername} onChange={e => setEmailOrUsername(e.target.value)}/>
                    <input type="text" placeholder="Password" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-4 mb-5" value={password} onChange={e => setPassword(e.target.value)}/>
                    <div className="flex items-center justify-center">
                    <Button onClick={handleClick} className="bg-gray-950 text-gray-300">Submit</Button>
                    </div>
                </form>
                <div className="flex flex-row-reverse pr-5">
                    <Button className="bg-gray-950"><Link to="/register" className="text-gray-300">Register</Link></Button>
                    <h2>Didn't have account?</h2>
                </div>
            </div>
        </div>
    )
}