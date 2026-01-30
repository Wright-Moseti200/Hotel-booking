import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Rooms from './pages/Rooms'
import Bookings from './pages/Bookings'
import Contextprovider, { Contextdata } from './context/Contextprovider'
import AuthModal from './components/AuthModal'
import RegisterHotelPopup from './components/RegisterHotelPopup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Dashboard from './pages/admin/Dashboard'
import AddRoom from './pages/admin/AddRoom'
import ListRoom from './pages/admin/ListRoom'
import Sidebar from './components/admin/Sidebar'
import AdminNavbar from './components/admin/AdminNavbar'
import { useState } from 'react'


const App = () => {
  return (
    <BrowserRouter>
      <Contextprovider>
        <MainApp />
        <ToastContainer />
      </Contextprovider>
    </BrowserRouter>
  )
}

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans">
      <AdminNavbar setSidebarOpen={setSidebarOpen} />
      <div className='flex items-start'>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className='w-full md:w-[80%] p-4 md:p-8 bg-white min-h-[calc(100vh-80px)]'>
          {children}
        </div>
      </div>
    </div>
  )
}

const MainApp = () => {
  const { showAuthModal, setShowAuthModal, authMode, showHotelModal, setShowHotelModal } = useContext(Contextdata);

  return (
    <>
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        isLoginMode={authMode === 'login'}
      />
      <RegisterHotelPopup
        isOpen={showHotelModal}
        onClose={() => setShowHotelModal(false)}
      />

      <Routes>
        {/* User Routes */}
        <Route path='/' element={<Homepage />} />
        <Route path="rooms/:id" element={<Rooms />} />
        <Route path="mybookings" element={<Bookings />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/add-room" element={<AdminLayout><AddRoom /></AdminLayout>} />
        <Route path="/admin/list-room" element={<AdminLayout><ListRoom /></AdminLayout>} />
      </Routes>
    </>
  )
}

export default App