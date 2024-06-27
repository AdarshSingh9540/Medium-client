import { Link } from "react-router-dom"
import {Avatar} from "./BlogCard"

export const Navbar = () =>{
    return <div className="border-b flex justify-between px-10 py-4">
        <Link to={"/blogs"}>
        <div className="font-bold text-lg">
            Medium
        </div>
        </Link>
        <div>
       <Link to={'/publish'}>
       <button type="button" className="mr-6 text-white  bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
       </Link>
            <Avatar name="Adarsh" />
        </div>
    </div>
}