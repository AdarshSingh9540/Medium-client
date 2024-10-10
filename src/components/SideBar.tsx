import  { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Home, PenTool, Cpu, LogIn, UserPlus, X, LogOut } from "lucide-react"

interface SideBarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    if (token && name) {
      setIsAuthenticated(true)
   
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    setIsAuthenticated(false)

    navigate('/signin')
  }

  const authenticatedMenuItems = [
    { to: "/blogs", icon: Home, label: "Dashboard" },
    { to: "/publish", icon: PenTool, label: "Publish" },
    { to: "/ai", icon: Cpu, label: "AI" },
  ]

  const unauthenticatedMenuItems = [
    { to: "/signin", icon: LogIn, label: "Sign In" },
    { to: "/signup", icon: UserPlus, label: "Sign Up" },
  ]

  const menuItems = isAuthenticated ? authenticatedMenuItems : unauthenticatedMenuItems

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out sm:translate-x-0 sm:static sm:inset-auto sm:transform-none`}
    >
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <Link to="/blogs" className="hidden lg:block">
            <div className="font-bold text-md flex items-center">
              <img className="w-12 mr-2" src="https://static.thenounproject.com/png/19895-200.png" alt="" />
              IndiBlog
            </div>
          </Link>
          <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 sm:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* {isAuthenticated && (
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <span className="ml-3 text-gray-700 font-medium">{userName}</span>
          </div>
        )} */}
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.to}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-purple-100 group"
                onClick={toggleSidebar}
              >
                <item.icon className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-purple-600" />
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-purple-100 group"
              >
                <LogOut className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-purple-600" />
                <span className="ml-3">Logout</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </aside>
  )
}

export default SideBar