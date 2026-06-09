import PostCard from "@/components/PostCard"
import Header from "../components/Header"
import CreatePost from "@/components/CreatePost"
import Profile from "@/components/Profile"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    return (
        <div className="h-screen w-full flex">
        <div className="h-screen w-full flex justify-center bg-gray-800 overflow-y-scroll">
                <PostCard />
        </div>
        <CreatePost/>
        </div>
    )
}