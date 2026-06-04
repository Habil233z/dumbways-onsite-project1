import PostCard from "@/components/PostCard"
import Header from "../components/Header"
import CreatePost from "@/components/CreatePost"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    return (
        <>
        <Header/>
        <div className="h-full flex justify-center items-center bg-gray-800">
            <div className="h-full min-h-screen bg-gray-700 w-[60%] flex flex-col border-l-2 border-r-2 border-gray-950 pb-20">
                <PostCard />
            </div>
        </div>
        <CreatePost/>
        </>
    )
}