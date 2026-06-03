import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

export default function Register() {

    if (localStorage.getItem("token")) {
        window.location.href = "/"
    }

    const handleClick = async e => {
        e.preventDefault()
        if (username === ""|| full_name === "" || email === "" || password ==="" || bio === "") {
            window.alert("All box must be filled")
            window.location.href = '/register'
        }
        const response = await axios.post("http://localhost:3000/register", {username, full_name, email, password, bio})
        
        localStorage.setItem("token", response.data.token)
        window.location.href = '/'
    }

    const [username, setUsername] = useState("")
    const [full_name, setFull_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")

    return (
        <div className="h-screen flex justify-center items-center bg-gray-900">
            <div className="border-gray-800 border-2 w-200 bg-gray-700 pb-10">
                <h1 className="text-center mt-8 text-4xl font-extrabold text-green-600">Circle</h1>
                <h2 className="text-center mt-8 text-4xl mb-5 text-gray-950 font-medium">Register to Circle</h2>
                <form className="flex justify-center items-center">
                    <div className="w-180 flex flex-col gap-4">
                        <input type="text" name="username" placeholder="Username" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-5" value={username} onChange={e => setUsername(e.target.value)}/>
                        <input type="text" name="full_name" placeholder="Full Name" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-5" value={full_name} onChange={e => setFull_name(e.target.value)}/>
                        <input type="text" name="email" placeholder="Email" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-5" value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="text" name="password" placeholder="Password" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-5" value={password} onChange={e => setPassword(e.target.value)}/>
                        <input type="text" name="bio" placeholder="Your bio" className="h-10 bg-gray-300 max-w-full border-2 border-gray-600 pl-5 min-h-50 text-wrap" value={bio} onChange={e => setBio(e.target.value)}/>
                        <div className="flex items-center justify-center">
                        <Button type="submit" onClick={handleClick} className="bg-gray-950 text-gray-300">Submit</Button>
                        </div>
                    </div>
                </form>
                <div className="flex flex-row-reverse pr-5">
                    <Button className="bg-gray-950 text-gray-300"><Link to="/login">Login</Link></Button>
                    <h2>Already have an account?</h2>
                </div>
            </div>
        </div>
    )
}