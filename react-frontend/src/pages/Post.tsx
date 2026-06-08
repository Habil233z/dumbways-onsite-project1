import PostCard from "@/components/PostCard"
import Header from "../components/Header"
import CreatePost from "@/components/CreatePost"
import Profile from "@/components/Profile"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    return (
        <div className="flex">
        <Header/>
        <div className="h-screen pb-30 w-full flex justify-center items-center bg-gray-800 overflow-y-scroll overflow-hidden pt-68">
            <div className="min-h-screen mt-185 bg-gray-700 w-[90%] flex flex-col border-l-2 border-r-2 border-gray-950 items-center pt-20 pb-10 rounded-4xl">
                <PostCard />
            </div>
        </div>
        <Profile />
        <CreatePost/>
        </div>
    )
}