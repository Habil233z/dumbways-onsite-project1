import { unSetProfile } from "@/slices_redux/profileSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

export default function SideHeader() {
    const dispatch = useDispatch()

    function handleClick() {
    localStorage.removeItem("token")
    dispatch(unSetProfile())
    window.location.href="/login"
    }

    return (
    <div className="flex flex-col h-screen bg-gray-100 w-[33%]">
        <div className="flex justify-center items-center"></div>
        <div className="">
            <Link to="/post"><div id="postSideHeader" className=" h-15 w-full flex items-center pl-5 hover:border-2 hover:border-t-0 hover:border-gray-950 text-xl font-medium active:bg-gray-300"><svg viewBox="0 0 24 24" width="20" height="20" className="mr-5"><path d="M19.5,2H4.5C2.02,2,0,4.02,0,6.5v11c0,2.48,2.02,4.5,4.5,4.5h15c2.48,0,4.5-2.02,4.5-4.5V6.5c0-2.48-2.02-4.5-4.5-4.5ZM4.5,3h15c1.93,0,3.5,1.57,3.5,3.5v.5H1v-.5c0-1.93,1.57-3.5,3.5-3.5Zm15,18H4.5c-1.93,0-3.5-1.57-3.5-3.5V8H23v9.5c0,1.93-1.57,3.5-3.5,3.5ZM11,11.5c0,.28-.22,.5-.5,.5h-2.5v5.5c0,.28-.22,.5-.5,.5s-.5-.22-.5-.5v-5.5h-2.5c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5h6c.28,0,.5,.22,.5,.5Zm9,0c0,.28-.22,.5-.5,.5h-6c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5h6c.28,0,.5,.22,.5,.5Zm0,4c0,.28-.22,.5-.5,.5h-6c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5h6c.28,0,.5,.22,.5,.5Z"/></svg>Post</div></Link>
            <Link to="/"><div id="profileSideHeader" className=" h-15 w-full flex items-center pl-5 hover:border-2 hover:border-gray-950 text-xl font-medium active:bg-gray-300"><svg viewBox="0 0 24 24" width="20" height="20" className="mr-5"><g><path d="M21,24H19V18.957A2.96,2.96,0,0,0,16.043,16H7.957A2.96,2.96,0,0,0,5,18.957V24H3V18.957A4.963,4.963,0,0,1,7.957,14h8.086A4.963,4.963,0,0,1,21,18.957Z"/><path d="M12,12a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,12ZM12,2a4,4,0,1,0,4,4A4,4,0,0,0,12,2Z"/></g></svg>Profile</div></Link>
            <Link to="/search"><div id="searchSideHeader" className=" h-15 w-full flex items-center pl-5 hover:border-2 hover:border-gray-950 text-xl font-medium active:bg-gray-300"><svg viewBox="0 0 24 24" width="20" height="20" className="mr-5"><path d="M9,12c3.309,0,6-2.691,6-6S12.309,0,9,0,3,2.691,3,6s2.691,6,6,6Zm0-10c2.206,0,4,1.794,4,4s-1.794,4-4,4-4-1.794-4-4,1.794-4,4-4Zm14.959,20.545l-3.792-3.792c.524-.791,.833-1.736,.833-2.753,0-2.757-2.243-5-5-5s-5,2.243-5,5,2.243,5,5,5c1.017,0,1.962-.309,2.753-.833l3.792,3.792,1.414-1.414Zm-7.959-3.545c-1.654,0-3-1.346-3-3s1.346-3,3-3,3,1.346,3,3-1.346,3-3,3Zm-6.706-5c-.189,.634-.294,1.305-.294,2H5c-1.654,0-3,1.346-3,3v5H0v-5c0-2.757,2.243-5,5-5h4.294Z"/></svg>Search</div></Link>
            <Link to="/follows"><div id="followsSideHeader" className=" h-15 w-full flex items-center pl-5 hover:border-2 hover:border-gray-950 text-xl font-medium active:bg-gray-300"><svg viewBox="0 0 24 24" width="20" height="20" className="mr-5"><path d="m5 18.5c0 .276-.224.5-.5.5-1.93 0-3.5 1.57-3.5 3.5v1c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1c0-2.481 2.019-4.5 4.5-4.5.276 0 .5.224.5.5zm2-5c0 1.379-1.122 2.5-2.5 2.5s-2.5-1.121-2.5-2.5 1.122-2.5 2.5-2.5 2.5 1.121 2.5 2.5zm-1 0c0-.827-.673-1.5-1.5-1.5s-1.5.673-1.5 1.5.673 1.5 1.5 1.5 1.5-.673 1.5-1.5zm13.5 4.5c-.276 0-.5.224-.5.5s.224.5.5.5c1.93 0 3.5 1.57 3.5 3.5v1c0 .276.224.5.5.5s.5-.224.5-.5v-1c0-2.481-2.019-4.5-4.5-4.5zm0-2c-1.379 0-2.5-1.121-2.5-2.5s1.121-2.5 2.5-2.5 2.5 1.121 2.5 2.5-1.121 2.5-2.5 2.5zm0-1c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.5-1.5-1.5.673-1.5 1.5.673 1.5 1.5 1.5zm-10.5-5c0-1.654 1.346-3 3-3s3 1.346 3 3-1.346 3-3 3-3-1.346-3-3zm1 0c0 1.103.897 2 2 2s2-.897 2-2-.897-2-2-2-2 .897-2 2zm2 5c-2.757 0-5 2.243-5 5v3.5c0 .276.224.5.5.5s.5-.224.5-.5v-3.5c0-2.206 1.794-4 4-4s4 1.794 4 4v3.5c0 .276.224.5.5.5s.5-.224.5-.5v-3.5c0-2.757-2.243-5-5-5zm3.5-10h3.5v3.5c0 .276.224.5.5.5s.5-.224.5-.5v-3.5h3.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5h-3.5v-3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3.5h-3.5c-.276 0-.5.224-.5.5s.224.5.5.5z"/></svg>Follows</div></Link>     
        </div>
        <div className="flex w-full justify-center mt-10">
        <Link to="/login"><div onClick={handleClick} className="bg-blue-700 text-gray-200 border-2 border-gray-950 flex items-center h-10 pl-20 pr-20 rounded-4xl hover:bg-red-700 active:bg-red-600 shadow-2xl">Log out</div></Link>
        </div>
    </div>
    )
}