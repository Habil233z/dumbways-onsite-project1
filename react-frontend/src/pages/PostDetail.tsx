import Header from "../components/Header"
import Profile from "@/components/Profile"
import PostDetail from "@/components/PostDetail"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    return (
        <div className="h-screen pb-30 w-full flex justify-center items-center bg-gray-800 overflow-y-scroll overflow-hidden">
            <div className="min-h-screen mt-80 bg-gray-700 w-[80%] flex flex-col border-l-2 border-r-2 border-gray-950 rounded-4xl">
                <PostDetail />
            </div>
        </div>
    )
}