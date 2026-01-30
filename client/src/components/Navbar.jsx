/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Contextdata } from '../context/Contextprovider'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { setShowAuthModal, setAuthMode, setShowHotelModal, showAuthModal, showHotelModal, user, logout } = useContext(Contextdata);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`flex justify-center items-center w-full h-24 fixed top-0 z-50 transition-all duration-300 ${isModalOpen ? 'pointer-events-none opacity-50' : ''} ${!isHome || isScrolled || isMenuOpen ? 'bg-black shadow-md' : ''}`}>
      <div className='flex justify-between items-center w-5/6 max-w-7xl'>
        <div className='flex items-center gap-2'>
          <img src={assets.logo} className='cursor-pointer h-8' alt="QuickStay" onClick={() => window.location.href = '/'} />
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex gap-8'>
          <Link to="/" className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Home</Link>
          <Link to="/mybookings" className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Bookings</Link>
          <Link className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Hotels</Link>
          <Link className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Experience</Link>
          <Link className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>About</Link>
        </div>

        <div className='flex items-center gap-6'>
          <img src={assets.searchIcon} className={`h-5 w-5 cursor-pointer transition-all ${isHome && !isMenuOpen ? 'invert brightness-0 filter md:invert-0' : 'invert brightness-0 filter'}`} alt="Search" />

          {/* Desktop Action Buttons */}
          <button
            onClick={() => setShowHotelModal(true)}
            className='hidden md:block font-medium text-sm transition-colors text-gray-200 hover:text-white hover:cursor-pointer'>
            List your property
          </button>

          {user && (
            <Link
              to='/admin'
              className='hidden md:block font-medium text-sm transition-colors text-gray-200 hover:text-white hover:cursor-pointer'>
              Dashboard
            </Link>
          )}

          {user ? (
            <button
              onClick={logout}
              className='hidden md:block bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer'>
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              className='hidden md:block bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer'>
              Login
            </button>
          )}

          {/* Mobile Menu Toggle Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden z-50 focus:outline-none'
          >
            <img
              src={isMenuOpen ? assets.closeMenu : assets.menuIcon}
              className={`h-6 w-6 transition-transform duration-300 ${isHome && !isMenuOpen ? 'invert brightness-0 filter' : 'filter-none invert'}`} // Simple invert logic for now, or just use white icons on black bg
              alt="Menu"
              style={{ filter: isHome && !isMenuOpen && !isScrolled ? 'invert(1)' : 'invert(1)' }} // Force white icon on dark bg or when open
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-black/95 flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <Link href="/" className='text-white text-2xl font-medium hover:text-gray-300 transition-colors'>Home</Link>
        <Link href="/mybookings" className='text-white text-2xl font-medium hover:text-gray-300 transition-colors'>Bookings</Link>
        <Link className='text-white text-2xl font-medium hover:text-gray-300 transition-colors'>Hotels</Link>
        <Link className='text-white text-2xl font-medium hover:text-gray-300 transition-colors'>Experience</Link>
        <Link className='text-white text-2xl font-medium hover:text-gray-300 transition-colors'>About</Link>

        <div className='w-full max-w-xs h-px bg-gray-800 my-2'></div>

        <button
          onClick={() => {
            setShowHotelModal(true);
            setIsMenuOpen(false);
          }}
          className='text-white text-xl font-medium hover:text-gray-300 transition-colors'>
          List your property
        </button>

        {user && (
          <Link
            to='/admin'
            className='text-white text-xl font-medium hover:text-gray-300 transition-colors'>
            Dashboard
          </Link>
        )}

        {user ? (
          <button
            onClick={() => {
              logout();
              setIsMenuOpen(false);
            }}
            className='bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors mt-4 w-48'>
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              setAuthMode('login');
              setShowAuthModal(true);
              setIsMenuOpen(false);
            }}
            className='bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors mt-4 w-48'>
            Login
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar