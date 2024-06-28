import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("name");
    window.location.replace('/signup'); // Ensure '/signup' is the correct path
  };

  const userName = localStorage.getItem("name");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
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
          {userName && (
            <div className="relative">
              <span
                className="cursor-pointer"
                onClick={toggleDropdown}
                onBlur={closeDropdown}
                tabIndex={0} // to make it focusable
              >
                <Avatar name={userName} />
              </span>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900">Signed in as {userName}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/blogs">
                      <button
                        onClick={closeDropdown}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Home
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button
                        onClick={handleSignOut}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      >
                        Sign out
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
