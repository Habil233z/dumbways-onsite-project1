import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function AuthButton() {

    function handleClick() {
        localStorage.removeItem("token")
        window.location.href = '/'
    }

    if (!localStorage.getItem("token")) {
        return (
        <div className="flex flex-row-reverse w-full mr-2">
            <div className="flex items-center justify-center">
            <Button><Link to="/register">Register</Link></Button>
            </div>
            <div className="flex items-center justify-center">
            <Button><Link to="/login">Login</Link></Button>
            </div>
        </div>
        )
    } else {
        return(
        <>
        <div className="flex  flex-col items-center justify-center ml-2">
        <Button><Link to="/">Home</Link></Button>
        </div>
        <div className="flex flex-row-reverse w-full mr-2">
            <div className="flex items-center justify-center">
            <Button onClick={handleClick}><Link to="/">logout</Link></Button>
            </div>
            <div className="flex items-center justify-center">
            <Button><Link to="/post">Post</Link></Button>
            </div>
        </div>
        </>
        )
    }
}

export default function Header() {
    return (
    <div className="flex h-20 w-full bg-gray-400 border-b-4 border-gray-800">
        <AuthButton />
    </div>
    )
}