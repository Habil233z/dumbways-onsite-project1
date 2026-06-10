import PostCard from "@/components/PostCard"
import Header from "../components/Header"
import CreatePost from "@/components/CreatePost"
import Profile from "@/components/SideProfile"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    document.getElementById("SideProfile")?.classList.remove("hidden")

    return (
        <div className="h-screen w-full flex">
        <div className="h-screen w-full flex justify-center bg-gray-100 overflow-y-scroll ">
                <PostCard />
        </div>
        <CreatePost/>
        </div>
    )
}