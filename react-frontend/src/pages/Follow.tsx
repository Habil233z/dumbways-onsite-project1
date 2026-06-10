
export default function Follow() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    document.getElementById("SideProfile")?.classList.remove("hidden")

    return (
    <>
        <div className="h-screen flex bg-gray-100 flex-col  w-full items-center">
            <div className="bg-white h-20 w-full border-b-2 border-gray-900 flex">
                <div className="bg-white h-20 w-full border-b-2 border-gray-900 border-r-2 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300">
                    <h1 className="text-3xl">Following</h1>
                </div>
                <div className="bg-white h-20 w-full border-b-2 border-gray-900 border-l-2 flex items-center justify-center hover:bg-gray-200 active:bg-gray-300">
                    <h1 className="text-3xl">Follower</h1>
                </div>
            </div>
            <div className=""></div>
        </div>
    </>

    )
}