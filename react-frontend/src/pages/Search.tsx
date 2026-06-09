import Profile from "@/components/Profile"
import Header from "../components/Header"

export default function Search() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    return (
        <div className="flex">
        <Header />
        <div className="h-screen flex bg-gray-800 flex-col  w-full">
            <div className="h-20 mb-10 bg-gray-700 border-b-2 border-gray-950 flex justify-center items-center">
                <input type="text" className="bg-gray-600 h-10 w-[70%] pl-6" placeholder="Search User"/>
            </div>
        </div>
        <Profile />
        </div>
    )
}