import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    localStorage.removeItem("name");
    navigate('/signup');
  };
  
  const userName = localStorage.getItem("name");
  
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to="/blogs">
        <div className="font-bold text-lg">Medium</div>
      </Link>
      <div className="relative">
        <div className="flex items-center">
          <Link to="/publish">
            <button
              type="button"
              className="mr-6 text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900">Signed in as {userName}</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate('/blogs');
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleSignOut();
                      }}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
                className="text-white bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};