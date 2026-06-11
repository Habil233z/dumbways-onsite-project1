import PostDetail from "@/components/PostDetail"
import { useEffect } from "react"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    useEffect(() => {
            document.getElementById("postSideHeader")?.classList.add("bg-gray-600")
            document.getElementById("profilePadding")?.classList.add("hidden")
        })

    document.getElementById("profilePadding")?.classList.add("hidden")
    document.getElementById("postSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("SideProfile")?.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    return (
        <div className="h-screen w-full flex">
            <div className="h-screen w-full flex justify-center bg-gray-100 overflow-y-scroll dark:bg-gray-950">
                <PostDetail />
            </div>
        </div>
    )
}