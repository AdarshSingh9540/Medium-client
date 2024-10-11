import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import SideBar from './SideBar'
import { Navbar } from './Navbar'

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation() 

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const isAuthPage = ['/', '/signup', '/signin'].includes(location.pathname)

  return (
    <div className="flex h-screen bg-gray-100">
      {!isAuthPage && <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {!isAuthPage && <Navbar toggleSidebar={toggleSidebar} />}
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  )
}
