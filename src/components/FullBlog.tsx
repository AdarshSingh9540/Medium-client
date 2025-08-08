import { useState, useEffect } from "react";
import parse from "html-react-parser";
import { motion } from "framer-motion";
import { CalendarDays, Clock, ChevronLeft, Share2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Confetti from "react-dom-confetti";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface BlogSchema {
  title: string;
  content: string;
  publishedDate: string;
  author: {
    name: string;
    bio?: string;
    description?: string;
  };
}

interface FullBlogProps {
  blog: BlogSchema;
}

export const FullBlog = ({ blog }: FullBlogProps) => {
  const { id } = useParams<{ id: string }>();
  const [readingTime, setReadingTime] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const text = blog.content.replace(/<[^>]*>?/gm, "");
    const words = text.split(/\s+/).length;
    const time = Math.ceil(words / 200);
    setReadingTime(time);
  }, [blog.content]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const confettiConfig = {
    angle: 90,
    spread: 45,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    colors: ["#ffae00", "#ff004c", "#6b00ff", "#00c4ff"],
  };

  const handleShare = async () => {
    const shareData = {
      title: blog.title,
      text: blog.content.replace(/<[^>]*>?/gm, "").slice(0, 100) + "...",
      url: `https://indiblog.vercel.app/blog/${id}`,
    };

    try {
      await navigator.share(shareData);
      toast.success("Blog has been shared successfully!", { duration: 3000 });
    } catch (err) {
      console.error("Error sharing content:", err);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-2 py-8"
      >
        <Button
          asChild
          variant="outline"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 mb-6"
        >
          <Link to="/blogs">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-lg font-medium">Back to Blog</span>
          </Link>
        </Button>
        <div className="lg:grid lg:grid-cols-12 gap-8">
          <div className="col-span-8">
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="p-6 sm:p-10">
                <div className="flex justify-between">
                  <h1 className="text-2xl  font-extrabold text-gray-900 mb-4 leading-tight">
                    {blog.title}
                  </h1>
                  <Share2
                    onClick={handleShare}
                    className="cursor-pointer h-8 w-8"
                  />
                </div>
                <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-purple-500" />
                    <span>
                      {blog.publishedDate
                        ? new Date(blog.publishedDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "10 Sept 2024"}
                    </span>
                  </div>

                  <div className="hidden sm:block w-1 h-1 bg-purple-300 rounded-full"></div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-purple-500" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {parse(blog.content)}
                </div>
              </div>
            </motion.div>
          </div>
          <div className="col-span-4 mt-8 lg:mt-0">
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2 ">
                  About the Author
                </h2>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-inner">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-md font-semibold text-gray-900">
                      {blog.author.name}
                    </h3>
                    <p className="text-sm text-purple-600">
                      {blog.author.bio || "Author"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {blog.author.description ||
                    "Hey, my name is Adarsh Singh. I am a student currently pursuing a Bachelor of Technology in Information Technology from MAIT, Rohini, Delhi. I am a passionate full-stack web developer with a keen interest in learning and exploring new technologies."}
                </p>
                <div className="relative inline-block mt-5 w-full">
                  <button
                    className={`w-full text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform ${
                      isFollowing ? "scale-105" : ""
                    } hover:from-purple-600 hover:to-pink-600 transition-colors duration-200 ease-in-out`}
                    onClick={handleFollow}
                  >
                    {isFollowing ? "Following Author" : "Follow Author"}
                  </button>
                  <Confetti active={isFollowing} config={confettiConfig} />
                  {isFollowing && (
                    <p className="text-green-500 font-semibold mt-2 animate-bounce">
                      You are now following the author!
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
