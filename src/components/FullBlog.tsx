import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { Navbar } from "./Navbar";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-12 p-8 pt-200">
        <div className="col-span-8">
          <div className="text-5xl font-extrabold">
            {blog.title}
          </div>
          <div className="text-slate-500 pt-2" >
            Post on 22nd june 2024
          </div>
          <div>
            {blog.content}
          </div>
        </div>
        <div className="col-span-4">
          <div className="text-slate-600 text-lg">
          Author
           <div className="w-full flex">
         <div className="pr-2  ">  <Avatar  name={blog.author.name || "Adarsh"}/></div>
           <div>
           <div className="text-xl  font-bold">
                {blog.author.name || "Adarsh"}
            </div>
            <div className="pt-2 text-slate-500">
                this is detail explnation about user and authro ability to grab attention to user 
            </div>
           </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};
