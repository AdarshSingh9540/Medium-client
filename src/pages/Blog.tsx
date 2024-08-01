import { FullBlog } from "../components/FullBlog";
import { Navbar } from "../components/Navbar";
import SideBar from "../components/SideBar";

import Spinner from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return <div>
    <Navbar/>
     <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <Spinner/>
      </div> 
      

     </div>
  </div>
  }

  if (!blog) {
    return <div>No blog found</div>;
  }

  return (
    <div>
      <div className="hidden lg:block">
            <SideBar />
          </div>
        <div className="my-20 lg:ml-64">
        <FullBlog blog={blog} />
        </div>
    </div>
  );
};
