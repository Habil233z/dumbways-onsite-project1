
export default function Follow() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    document.getElementById("postSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("profileSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("searchSideHeader")?.classList.remove("bg-gray-600")
    document.getElementById("followsSideHeader")?.classList.add("bg-gray-600")
    document.getElementById("SideProfile")?.classList.remove("hidden")

    return (
    <>
        <div className="h-screen flex bg-gray-100 flex-col  w-full items-center dark:bg-gray-950">
            <div className="bg-white h-15 w-full flex dark:bg-gray-900">
                <div className="bg-white h-full w-full border-b-2 border-gray-900 border-r-2 border-l-2 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 rounded-bl-xl dark:bg-gray-900 dark:hover:bg-gray-800 dark:active:bg-gray-700">
                    <h1 className="text-3xl">Following</h1>
                </div>
                <div className="bg-white h-full w-full border-b-2 border-gray-900 border-l-2 border-r-2 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300 rounded-br-xl dark:bg-gray-900 dark:hover:bg-gray-800 dark:active:bg-gray-700">
                    <h1 className="text-3xl">Follower</h1>
                </div>
            </div>
            <div className=""></div>
        </div>
    </>

    )
}