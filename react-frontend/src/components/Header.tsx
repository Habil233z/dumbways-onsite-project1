import { Link } from "react-router-dom"

export default function Header() {
    function handleClick() {
    localStorage.removeItem("token")
    window.location.href="/login"
    }

    return (
    <div className="flex flex-col h-screen bg-gray-700 border-gray-950 w-[33%] border-r-2">
        <div className="h-20 border-b-2 border-l-2 border-gray-950 flex justify-center items-center"><h1 className="text-green-700 font-bold text-5xl">Circle</h1></div>
        <div className="pl-10 pr-10 bg-gray-800">
            <Link to="/"><div className="bg-gray-800 text-gray-300 h-15 w-full border-2 border-gray-950 flex items-center pl-5">Home</div></Link>
            <Link to="/search"><div className="bg-gray-800 text-gray-300 h-15 w-full border-2 border-gray-950 flex items-center pl-5">Search</div></Link>
            <Link to="/follow"><div className="bg-gray-800 text-gray-300 h-15 w-full border-2 border-gray-950 flex items-center pl-5">Follow</div></Link>
            <Link to="/post"><div className="bg-gray-800 text-gray-300 h-15 w-full border-2 border-gray-950 flex items-center pl-5">Post</div></Link>
            <Link to="/login"><div onClick={handleClick} className="bg-gray-800 text-gray-300 h-15 w-full border-2 border-gray-950 flex items-center pl-5">Logout</div></Link>
        </div>
        <div className="h-10 bg-gray-900 w-full"></div>
    </div>
    )
}