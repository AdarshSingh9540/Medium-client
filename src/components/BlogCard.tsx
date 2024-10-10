import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, ChevronRight } from 'lucide-react'

interface BlogCardProps {
  authorName: string
  title: string
  content: string
  publishedDate: string
  id: number
}

export const BlogCard = ({ id, authorName, title, content, publishedDate }: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false) // New state to toggle content

  const stripHtmlTags = (html: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    return tempDiv.textContent || tempDiv.innerText || ''
  }

  const cleanContent = stripHtmlTags(content)
  const previewContent = cleanContent.slice(0, 250) // Limit the content preview to 150 characters

  return (
    <Link to={`/blog/${id}`}>
      <motion.div
        className="cursor-pointer mx-auto w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl"
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Avatar name={authorName} />
            <div className="ml-3">
              <span className="font-semibold text-gray-800 text-lg">{authorName || 'Unknown Author'}</span>
              <div className="flex items-center text-sm text-purple-600 mt-1">
                <CalendarDays className="w-4 h-4 mr-1" />
                {new Date(publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-purple-700 transition-colors duration-200">{title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">
            {isExpanded ? cleanContent : `${previewContent}...`} 
        
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-purple-600">
              <Clock className="w-4 h-4 mr-1" />
              {`${Math.ceil(cleanContent.length / 100)} min read`}
            </div>
            <motion.div
              className="flex items-center text-purple-600 font-medium"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              Read more
              <ChevronRight className="w-4 h-4 ml-1" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export function Avatar({ name }: { name: string }) {
  const initials = name ? name.charAt(0).toUpperCase() : '?'

  return (
    <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-inner">
      <span className="font-bold text-xl text-white">{initials}</span>
    </div>
  )
}
