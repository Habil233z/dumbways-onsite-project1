import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"


export default function Profile() {
    const profile = useSelector((state) => state.profile)
    console.log(profile)

    

    return (
        <div className="w-[33%] bg-gray-900 pt-20 flex justify-center">
            <div className="h-100 w-80 bg-gray-500 border-gray-950 border-2 flex flex-col items-center">
                <div className="rounded-[50%] w-20 h-20 overflow-hidden flex justify-center items-center mt-5 border-2 border-gray-950">
                    <img src="http://localhost:3000/uploads/file-1780633172175-863621376.png" className="object-none h-full"></img>
                </div>
                <div>
                    <h1 className="text-3xl">Placeholder Username</h1>
                    <p className=""> Placeholder bio</p>
                </div>
            </div>
        </div>
    )
}