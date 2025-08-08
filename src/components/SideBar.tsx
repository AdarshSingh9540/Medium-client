//@ts-nocheck
import  { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, PenTool, Cpu, LogIn, UserPlus, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

function SideBar({ isOpen, toggleSidebar }: SideBarProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      setIsAuthenticated(true);
      setUserName(name);
    } else {
      setIsAuthenticated(false);
      setUserName(null);
    }
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "name") {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        if (token && name) {
          setIsAuthenticated(true);
          setUserName(name);
        } else {
          setIsAuthenticated(false);
          setUserName(null);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Close sidebar on route change only on mobile/tablet
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isOpen && isMobile) toggleSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleSidebar();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, toggleSidebar]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    if (isOpen && isMobile) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setIsAuthenticated(false);
    setUserName(null);
    navigate("/");
  };

  const authenticatedMenuItems = [
    { to: "/blogs", icon: Home, label: "Dashboard" },
    { to: "/publish", icon: PenTool, label: "Publish" },
    { to: "/ai", icon: Cpu, label: "Generate" },
  ];
  const unauthenticatedMenuItems = [
    { to: "/signin", icon: LogIn, label: "Sign In" },
    { to: "/signup", icon: UserPlus, label: "Sign Up" },
  ];
  const menuItems = isAuthenticated
    ? authenticatedMenuItems
    : unauthenticatedMenuItems;

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  };

  return (
    <>
      {/* Backdrop on mobile/tablet only */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 lg:hidden  ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        aria-hidden={!isOpen}
        onClick={toggleSidebar}
      />

      {/* Mobile: off-canvas; Desktop: sticky with 80vh height */}
      <aside
        role="complementary"
        aria-label="Sidebar"
        className={`z-50 mt-2 w-72 bg-white/90 supports-[backdrop-filter]:bg-white/75 backdrop-blur shadow-xl ring-1 ring-black/5
          transform fixed inset-y-0 left-0 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:sticky lg:top-20 lg:h-[80vh] lg:translate-x-0 lg:transform-none lg:ring-0 lg:shadow-none lg:rounded-xl lg:border lg:border-gray-200/60 lg:bg-white`}
      >
        <div className="flex h-full flex-col ">
          {/* <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/60"> */}
          {/* <Link
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
                className="w-9 h-9 rounded-md border border-gray-200 object-contain"
                src="https://static.thenounproject.com/png/19895-200.png"
                alt="IndiBlog logo"
                referrerPolicy="no-referrer"
              />
              <span className="font-semibold text-gray-900 tracking-tight hidden lg:block">
                IndiBlog
              </span>
            </Link> */}

          {/* Close only on mobile */}
          {/* <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
              aria-label="Close sidebar"
            >
              <X className="h-6 w-6" />
            </button> */}
          {/* </div> */}

          {/* User */}
          {/* {isAuthenticated && (
            <div className="px-4 py-3 border-b border-gray-200/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                  {(userName?.[0] || "U").toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">Logged in</p>
                </div>
              </div>
            </div>
          )} */}

          {/* Nav (scrolls inside the 80vh column) */}
          <nav
            role="navigation"
            aria-label="Primary"
            className="flex-1 overflow-y-auto px-2 py-6 mt-4"
          >
            <ul className="space-y-3">
              {menuItems.map((item, index) => {
                const active = isActive(item.to);
                return (
                  <li key={index} className="my-1">
                    <Link
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors
                        focus-visible:ring-2 focus-visible:ring-purple-500
                        ${
                          active
                            ? "bg-purple-50 text-purple-700 ring-1 ring-purple-200"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      onClick={() => {
                        const isMobile = window.matchMedia(
                          "(max-width: 1023px)"
                        ).matches;
                        if (isMobile) toggleSidebar();
                      }}
                    >
                      <item.icon
                        className={`h-5 w-5 transition-colors ${
                          active
                            ? "text-purple-600"
                            : "text-gray-500 group-hover:text-gray-700"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          {isAuthenticated && (
            <div className="mt-auto px-2 pb-3 pt-1 border-t border-gray-200/60">
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleLogout}
                className="relative overflow-hidden w-full group hidden md:flex items-center text-gray-600 hover:text-purple-600 rounded-md text-sm font-medium"
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
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default SideBar;
