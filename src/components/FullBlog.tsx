import { useState, useEffect } from 'react'
import { Blog } from "../hooks/index"
import parse from 'html-react-parser'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

// Define the Blog interface if not already done
interface BlogSchema {
  title: string
  content: string
  publishedDate: string
  author: {
    name: string
    bio?: string
    description?: string

  }
}

interface FullBlogProps {
  blog: BlogSchema
}

export const FullBlog = ({ blog }: FullBlogProps) => {
  const [readingTime, setReadingTime] = useState<number>(0)

  useEffect(() => {
    const text = blog.content.replace(/<[^>]*>?/gm, '') // Remove HTML tags
    const words = text.split(/\s+/).length
    const time = Math.ceil(words / 200) // Reading time logic
    setReadingTime(time)
  }, [blog.content])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Link to="/blogs" className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200 mb-6">
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span className="text-lg font-medium">Back to Blog</span>
        </Link>
        <div className="lg:grid lg:grid-cols-12 gap-8">
          <div className="col-span-8">
            <motion.div 
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="p-6 sm:p-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {blog.title}
                </h1>
                <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <CalendarDays className="w-4 h-4 mr-2 text-purple-500" />
                    <span>
  {blog.publishedDate 
    ? new Date(blog.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) 
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
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About the Author</h2>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{blog.author.name}</h3>
                    <p className="text-sm text-purple-600">{blog.author.bio || "Author"}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {blog.author.description || "This is a detailed explanation about the user and author's ability to grab attention to users."}
                </p>
                <div className="mt-6">
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-200">
                    Follow Author
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
