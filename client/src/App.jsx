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
        <Route path='/' element={<Homepage />} />
        <Route path="rooms/:id" element={<Rooms />} />
        <Route path="mybookings" element={<Bookings />} />
      </Routes>
    </>
  )
}

export default App