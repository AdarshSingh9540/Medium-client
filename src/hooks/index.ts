import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constant";

// Define the Blog interface
export interface Blog {
  content: string;
  title: string;
  id: number;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const fetchedBlog = response.data.blog; // Access the blog object directly
        
        // Map the response to match the Blog interface
        const mappedBlog: Blog = {
          id: fetchedBlog.id,
          content: fetchedBlog.content,
          title: fetchedBlog.title,
          // authorId: fetchedBlog.authorId,
          author: {
            name: "Adarsh Singh", // Replace with actual author name if available
          },
        };

        setBlog(mappedBlog);
        setLoading(false);
        console.log(mappedBlog);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};


// Custom hook to fetch all blogs
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Fetch all blogs from the API
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        // Access the blogs array directly from the response data
        const fetchedBlogs = response.data.blogs;

        // Map the response to match the Blog interface
        const mappedBlogs: Blog[] = fetchedBlogs.map((blog: any) => ({
          id: blog.id,
          content: blog.content,
          title: blog.title,
          author: {
            name: "Adarsh Singh", // Replace with actual author name if available
          },
        }));

        setBlogs(mappedBlogs);
        setLoading(false);
        console.log(mappedBlogs);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
