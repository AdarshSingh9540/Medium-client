import { BlogCard } from "../components/BlogCard";
import Shimmer from "../components/Shimmer";
import { useBlogs } from "../hooks";

function Blogs() {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <div className="w-full flex justify-center ">
          <div className="w-[65%] py-7 my-4 lg:my-10 mt-3">
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
          </div>
        </div>
      </div>
    );
  }
  console.log(blogs);
  return (
    <div>
      {blogs.map((blog) => (
        <div className="mt-2">
          <BlogCard
            id={blog.id}
            authorName={blog.author.name || "Adarsh singh"}
            title={blog.title}
            content={blog.content}
            publishedDate={"22 jun 2024"}
          />
        </div>
      ))}
    </div>
  );
}

export default Blogs;
