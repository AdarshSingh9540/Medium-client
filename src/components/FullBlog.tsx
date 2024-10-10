import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { Navbar } from "./Navbar";
import parse from 'html-react-parser'; 

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Navbar />
      <div className="lg:grid lg:grid-cols-12 p-8 pt-6 ">
        <div className="col-span-8 lg:ml-4 lg:mr-8">
          <div className="text-2xl lg:text-4xl font-extrabold">
            {blog.title}
          </div>
          <div className="flex items-center text-slate-500 pt-4">
            <Circle />
            <span className="pl-2">Post on 22nd June 2024</span> 
          </div>
          <div className="text-lg pt-5">
            {parse(blog.content)} 
          </div>
        </div>
        <div className="col-span-4 pt-6">
          <div className="text-slate-600 text-xl font-semibold">
            Author :
            <div className="w-full flex py-2">
              <div className="pr-2">
                <Avatar name={blog.author.name || "Adarsh"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Adarsh"}
                </div>
                <div className="pt-2 text-slate-500">
                  This is a detailed explanation about the user and author's ability to grab attention to users.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Circle() {
  return (
    <div className="rounded-full bg-slate-700 h-2 w-2"></div>
  );
}
