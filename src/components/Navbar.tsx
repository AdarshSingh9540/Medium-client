import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { Menu } from 'lucide-react'; // Make sure to import the Menu icon

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    localStorage.removeItem("name");
    navigate('/signup');
  };
  
  const userName = localStorage.getItem("name");
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="flex justify-between items-center px-4 lg:px-10 py-4">
        <div className="flex items-center">
          <button 
            className="lg:hidden mr-2"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </button>
          <Link to="/blogs" className="hidden lg:block">
            <div className="font-bold text-md flex items-center">
              <img className="w-8 mr-2" src="https://static.thenounproject.com/png/19895-200.png" alt="" />
              IndiBlog
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          <Link to="/publish">
            <button
              type="button"
              className="mr-4 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-3 py-1.5 lg:px-5 lg:py-2.5 text-center"
            >
              Publish
            </button>
          </Link>
          {userName ? (
            <div className="relative">
              <span
                className="cursor-pointer"
                onClick={toggleDropdown}
              >
                <Avatar name={userName} />
              </span>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 w-40 lg:w-60">
                  <div className="px-4 py-2">
                    <p className="text-sm px-2 lg:px-4 text-gray-900 font-medium">
                      <span className="hidden lg:inline text-md">signed in as</span> {userName}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/blogs');
                      }}
                      className="block font-semibold w-full px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleSignOut();
                      }}
                      className="font-semibold block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup">
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-1.5 lg:px-5 lg:py-2.5 text-center"
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
      {showMobileMenu && (
  <div className="lg:hidden bg-white py-4 px-6 text-center shadow-lg rounded-lg">
    <Link
      to="/blogs"
      className="block py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
    >
      Home
    </Link>
    <Link
      to="/publish"
      className="block py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
    >
      Publish
    </Link>
    <Link
      to="/ai"
      className="block py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
    >
      AI
    </Link>
    <Link
      to="/signin"
      className="block py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
    >
      Sign In
    </Link>
    <Link
      to="/signup"
      className="block py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 rounded-md transition-colors duration-200"
    >
      Sign Up
    </Link>
  </div>
)}

    </div>
  );
};