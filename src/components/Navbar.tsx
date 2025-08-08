import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      setIsAuthenticated(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsAuthenticated(false);
    setUserName("");
    navigate("/");
  };

  return (
    // Full-width wrapper stays transparent; we center an inner "bar"
    <nav className="sticky top-0 z-40 bg-transparent py-2">
      {/* Match your layout shell width (same as Sidebar+Content container) */}
      <div className="mx-auto w-full max-w-7xl px-4">
        {/* This is the actual bar that no longer spans the full screen */}
        <div className="h-14 md:h-16 px-3 sm:px-4 rounded-xl bg-white/95 shadow-md ring-1 ring-black/5 backdrop-blur flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger only on < lg */}
            <button
              onClick={toggleSidebar}
              className="inline-flex lg:hidden items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>

            <Link
              to="/blogs"
              className="flex items-center gap-3"
              aria-label="Go to Dashboard"
              onClick={() => {
                const isMobile = window.matchMedia(
                  "(max-width: 1023px)"
                ).matches;
                if (isMobile) toggleSidebar();
              }}
            >
              <img
                className="w-9 h-9 rounded-md  object-contain"
                src="https://static.thenounproject.com/png/19895-200.png"
                alt="IndiBlog logo"
                referrerPolicy="no-referrer"
              />
              <span className="font-semibold text-gray-900 tracking-tight hidden lg:block">
                IndiBlog
              </span>
            </Link>
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
                  className="relative overflow-hidden group hidden md:flex items-center text-gray-600 hover:text-purple-600 rounded-md text-sm font-medium"
                >
                  <motion.div
                    className="flex items-center justify-center w-full h-full border px-3 py-2 rounded-md"
                    initial={false}
                    animate={{ x: isHovered ? -40 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <span className="mr-1">Logout</span>
                    <LogOut className="w-4 h-4" />
                  </motion.div>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-purple-600 text-white rounded-md"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <span className="mr-1">Confirm</span>
                        <LogOut className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-purple-600 text-white hover:bg-purple-700 px-3 py-2 rounded-md text-sm font-medium ml-3"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
