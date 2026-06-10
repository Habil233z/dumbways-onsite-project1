import PostDetail from "@/components/PostDetail"

export default function Post() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/"
    }

    document.getElementById("postSideHeader")?.classList.add("bg-gray-200")
    document.getElementById("profileSideHeader")?.classList.remove("bg-gray-200")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-200")
    document.getElementById("followsSideHeader")?.classList.remove("bg-gray-200")
    document.getElementById("SideProfile")?.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    return (
        <div className="h-screen w-full flex">
            <div className="h-screen w-full flex justify-center bg-gray-100 overflow-y-scroll">
                <PostDetail />
            </div>
        </div>
    )
}