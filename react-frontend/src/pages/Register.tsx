import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios"

export default function Register() {

    if (localStorage.getItem("token")) {
        window.location.href = "/"
    }

    const handleClick = async e => {
        e.preventDefault()
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
        <div className="h-screen flex justify-center items-center">
            <div className="border-gray-800 border-2 h-200 w-200 bg-gray-200">
                <h1 className="text-center mt-8 text-4xl font-bold">Circle</h1>
                <h2 className="text-center mt-8 text-4xl">Register to Circle</h2>
                <form className="flex justify-center items-center">
                    <div className="w-180 flex flex-col gap-4">
                        <input type="text" name="username" placeholder="     Username" className="h-10 bg-amber-100 w-full border-2 border-gray-600" value={username} onChange={e => setUsername(e.target.value)}/>
                        <input type="text" name="full_name" placeholder="     Full Name" className="h-10 bg-amber-100 w-full border-2 border-gray-600" value={full_name} onChange={e => setFull_name(e.target.value)}/>
                        <input type="text" name="email" placeholder="     Email" className="h-10 bg-amber-100 w-full border-2 border-gray-600" value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="text" name="password" placeholder="     Password" className="h-10 bg-amber-100 w-full border-2 border-gray-600" value={password} onChange={e => setPassword(e.target.value)}/>
                        <input type="text" name="bio" placeholder="     Your bio" className="h-10 bg-amber-100 w-full border-2 border-gray-600" value={bio} onChange={e => setBio(e.target.value)}/>
                        <div className="flex items-center justify-center">
                        <Button type="submit" onClick={handleClick}>Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}