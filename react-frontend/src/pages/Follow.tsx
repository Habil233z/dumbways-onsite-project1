
export default function Follow() {
    if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    return (
    <>
        <div className="h-screen flex bg-gray-800 flex-col  w-full items-center">
            <div className="bg-gray-700 h-20 w-full border-b-2 border-gray-900 flex">
                <div className="bg-gray-700 h-20 w-full border-b-2 border-gray-900 border-r-2 flex items-center justify-center">
                    <h1 className="text-3xl">Following</h1>
                </div>
                <div className="bg-gray-700 h-20 w-full border-b-2 border-gray-900 border-l-2 flex items-center justify-center">
                    <h1 className="text-3xl">Follower</h1>
                </div>
            </div>
            <div className=""></div>
        </div>
    </>

    )
}