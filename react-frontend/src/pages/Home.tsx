import Profile from "@/components/Profile"
import Header from "../components/Header"

export default function Home() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    return (
        <div className="flex">
        <Header />
        <div className="h-screen flex bg-gray-800 flex-col  w-full">
            <div className="h-20 mb-10 bg-gray-700 border-b-2 border-gray-950"></div>
            <div className="border-gray-800 border-2 h-100 w-full bg-gray-200 justify-center items-center flex">
                <h1 className="text-center font-bold text-6xl">Home</h1>
            </div>
        </div>
        <Profile />
        </div>
    )
}