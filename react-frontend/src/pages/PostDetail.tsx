import Header from "../components/SideHeader"
import Profile from "@/components/SideProfile"
import PostDetail from "@/components/PostDetail"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    document.getElementById("SideProfile")?.classList.remove("hidden")

    return (
        <div className="h-screen w-full flex justify-center items-center bg-gray-100 overflow-y-scroll overflow-hidden">
            <div className="min-h-screen bg-gray-100 w-[80%] border-gray-950 rounded-4xl">
                <PostDetail />
            </div>
        </div>
    )
}