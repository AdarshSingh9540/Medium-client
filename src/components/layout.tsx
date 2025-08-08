import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { Navbar } from "./Navbar";

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen((s) => !s);
  const isAuthPage = ["/", "/signup", "/signin"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAuthPage && <Navbar toggleSidebar={toggleSidebar} />}

      {/* On lg+ we center the whole shell (sidebar + content) in one container */}
      <div className="relative lg:mx-auto lg:max-w-7xl lg:px-4 lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-6 ">
        {!isAuthPage && (
          <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* Center your feed column inside the right area */}
          <div className="mx-auto w-full max-w-6xl px-2 lg:px-0 py-2">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
