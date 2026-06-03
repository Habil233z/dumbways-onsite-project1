export default function Home() {
        if (!localStorage.getItem("token")) {
        window.location.href = "/login"
    }

    return (
        <>
        <div className="h-screen flex justify-center items-center">
            <div className="border-gray-800 border-2 h-100 w-200 bg-gray-200 justify-center items-center flex">
                <h1 className="text-center font-bold text-6xl">Home</h1>
            </div>
        </div>
        </>
    )
}