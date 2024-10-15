import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavbarProps {
  toggleSidebar: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    if (token && name) {
      setIsAuthenticated(true)
      setUserName(name)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    setIsAuthenticated(false)
    setUserName('')
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <div className="flex items-center mr-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="ml-2 text-gray-700">{userName}</span>
                </div>
                <button
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  onClick={handleLogout}
                  className="relative overflow-hidden  group flex items-center text-gray-600 hover:text-purple-600 px-3 py-1 rounded-md text-sm font-medium mx-6 hidden lg:block"
                >
                  <motion.div
                    className="flex items-center justify-center w-full h-full border p-3"
                    initial={false}
                    animate={{
                      x: isHovered ? -40 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <span className="mr-1">Logout</span>
                    <LogOut  className="w-2 h-2" />
                  </motion.div>

                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-purple-600 text-white"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <span className="mr-1">Confirm</span>
                        <LogOut className="w-2 h-2" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </Link>
                <Link to="/signup" className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium ml-3">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
