import Header from "../components/Header"
import Profile from "@/components/Profile"
import MainPost from "@/components/MainPost"
import PostReply from "@/components/PostReply"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    return (
        <div className="flex">
        <Header/>
        <div className="h-screen pb-30 w-full flex justify-center items-center bg-gray-800 overflow-y-scroll overflow-hidden">
            <div className="min-h-screen mt-80 bg-gray-700 w-[80%] flex flex-col border-l-2 border-r-2 border-gray-950 ">
                <MainPost />
                <PostReply />
            </div>
        </div>
        <Profile />
        </div>
    )
}