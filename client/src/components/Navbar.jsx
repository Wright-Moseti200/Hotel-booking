import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Contextdata } from '../context/Contextprovider'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const { setShowAuthModal, setAuthMode, setShowHotelModal, showAuthModal, showHotelModal, user, logout } = useContext(Contextdata);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = location.pathname === '/';
  const isModalOpen = showAuthModal || showHotelModal;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`flex justify-center items-center w-full h-24 fixed top-0 z-50 transition-all duration-300 ${isModalOpen ? 'pointer-events-none opacity-50' : ''} ${!isHome || isScrolled ? 'bg-black shadow-md' : ''}`}>
      <div className='flex justify-between items-center w-5/6 max-w-7xl'>
        <div className='flex items-center gap-2'>
          <img src={assets.logo} className='cursor-pointer h-8' alt="QuickStay" />
        </div>

        <div className='hidden md:flex gap-8'>
          <a href="/" className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Home</a>
          <a href="/mybookings" className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Bookings</a>
          <a className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Hotels</a>
          <p className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Experience</p>
          <p className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>About</p>
        </div>

        <div className='flex items-center gap-6'>
          <img src={assets.searchIcon} className={`h-5 w-5 cursor-pointer transition-all ${isHome ? 'invert brightness-0 filter md:invert-0' : 'invert brightness-0 filter'}`} alt="Search" />
          <button
            onClick={() => setShowHotelModal(true)}
            className='hidden lg:block font-medium text-sm transition-colors text-gray-200 hover:text-white hover:cursor-pointer'>
            List your property
          </button>
          {user && (
            <button
              onClick={() => window.location.href = 'http://localhost:5174'}
              className='hidden lg:block font-medium text-sm transition-colors text-gray-200 hover:text-white hover:cursor-pointer'>
              Dashboard
            </button>
          )}

          {user ? (
            <button
              onClick={logout}
              className='bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer'>
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              className='bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer'>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar