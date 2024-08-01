
import { BlogCard } from "../components/BlogCard"
import { Navbar } from "../components/Navbar"
import Shimmer from "../components/Shimmer";
import SideBar from "../components/SideBar";
import { useBlogs } from "../hooks"


function Blogs() {
    const {loading , blogs} = useBlogs();
    if(loading){
        return <div>
          <Navbar/>
          <div className="w-full flex justify-center ">
           <div className="w-[60%] py-7 my-2 mt-3">
           <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>
            <Shimmer/>            
            <Shimmer/>
           </div>
        </div>
        </div>
    }
    console.log(blogs);
  return (
    <div>
        <Navbar/>
        <div className="hidden lg:block">
            <SideBar />
          </div>
        <div className="flex justify-center pt-10 lg:pt-16">
        <div className=" py-7  ">
       {blogs.map(blog => 
    <div className="mt-5">
       <BlogCard 
       id={blog.id}
     authorName={blog.author.name || "Adarsh singh"}
     title={blog.title}
     content={blog.content}
     publishedDate={"22 jun 2024"}
     />
    </div>
    )}
    
    </div>
    </div>
    </div>

  )
}

export default Blogs