import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios"
import { Link } from "react-router-dom";

export default function Register() {
    if (localStorage.getItem("token")) {
        window.location.href="/post"
    }

    const handleClick = async e => {
        e.preventDefault()
        if (selectedFile === null) {
            return window.alert("Must select profile picture image file")
        }
        if (username === ""|| full_name === "" || email === "" || password ==="" || bio === "") {
            return window.alert("All box must be filled")
        }
        const file = selectedFile
        const response = await axios.post("http://localhost:3000/register", 
            {username, full_name, email, password, bio, file},
            {headers: {"Content-Type": "multipart/form-data"}}
        )
        localStorage.setItem("token", response.data.token)
        window.location.href="/post"
    }

    const [username, setUsername] = useState("")
    const [full_name, setFull_name] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [bio, setBio] = useState("")
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        document.body.style.overflow = "hidden"
        document.getElementById("header")?.classList.add("hidden")
    }, [])

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-950">
            <div className="border-gray-800 border-2 w-200 bg-white pb-10 rounded-4xl shadow-2xl dark:bg-gray-900">
                <h1 className="text-center mt-8 text-4xl font-extrabold text-blue-700 dark:text-blue-800">SociNet</h1>
                <h2 className="text-center mt-8 text-4xl mb-5 text-gray-950 font-medium dark:text-gray-300">Register to Circle</h2>
                <form className="flex justify-center items-center">
                    <div className="w-180 flex flex-col gap-4">
                        <input type="text" placeholder="Username" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-5 dark:text-gray-950 dark:bg-gray-500" onChange={e => setUsername(e.target.value)}/>
                        <input type="text" placeholder="Full Name" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-5 dark:text-gray-950 dark:bg-gray-500" onChange={e => setFull_name(e.target.value)}/>
                        <div className="flex-row-reverse flex">
                        <div className="flex items-center">
                            {!selectedFile && 
                            <>
                            <h3 className="mr-4 text-gray-800">Select your profile picture</h3>
                            <div className="flex justify-center items-center w-20 h-10 bg-gray-600 border-2 border-gray-900 rounded-xl hover:bg-gray-700 active:bg-gray-900 dark:bg-gray-950 dark:hover:bg-gray-700 dark:active:bg-gray-800">
                                <label className="text-gray-200">Image<input type="file" accept="image/*" className="hidden" onChange={e => setSelectedFile(e.target.files[0])}/></label>
                            </div>
                            </>}
                            {selectedFile && 
                            <>
                            <h3 className="mr-4 text-gray-800">Picture Selected</h3>
                            <div className="flex justify-center items-center w-20 h-10 bg-gray-800 border-2 border-gray-900 rounded-xl hover:bg-gray-700 active:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800 dark:active:bg-gray-950">
                                <label className="text-gray-200">Image<input type="file" accept="image/*" className="hidden" onChange={e => setSelectedFile(e.target.files[0])}/></label>
                            </div>
                            </>}
                            
                        </div>
                        </div>
                        <input type="text" placeholder="Email" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-5 dark:text-gray-950 dark:bg-gray-500" onChange={e => setEmail(e.target.value)}/>
                        <input type="text" placeholder="Password" className="h-10 bg-gray-300 w-full border-2 border-gray-600 pl-5 dark:text-gray-950 dark:bg-gray-500" onChange={e => setPassword(e.target.value)}/>
                        <input type="text" placeholder="Your bio" className="h-10 bg-gray-300 max-w-full border-2 border-gray-600 pl-5 min-h-50 text-wrap dark:text-gray-950 dark:bg-gray-500" value={bio} onChange={e => setBio(e.target.value)}/>
                        <div className="flex items-center justify-center">
                        <Button type="submit" onClick={handleClick} className="bg-gray-950 text-gray-300 dark:bg-gray-950 dark:hover:bg-gray-700 dark:active:bg-gray-800">Submit</Button>
                        </div>
                    </div>
                </form>
                <div className="flex flex-row-reverse pr-5">
                    <Button className="bg-gray-950 text-gray-300 dark:bg-gray-950 dark:hover:bg-gray-700 dark:active:bg-gray-800"><Link to="/login">Login</Link></Button>
                    <h2>Already have an account?</h2>
                </div>
            </div>
        </div>
    )
}