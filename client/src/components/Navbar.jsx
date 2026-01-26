import React from 'react'
import { assets } from '../assets/assets'

const Navbar = () => {
  return (
    <nav className='flex justify-center items-center w-full h-24 absolute top-0 z-50'>
      <div className='flex justify-between items-center w-5/6 max-w-7xl'>
        <div className='flex items-center gap-2'>
          <img src={assets.logo} className='cursor-pointer h-8' alt="QuickStay" />
        </div>

        <div className='hidden md:flex gap-8'>
          <p className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Home</p>
          <p className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Hotels</p>
          <p className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>Experience</p>
          <p className='text-gray-200 hover:text-white cursor-pointer font-medium transition-colors'>About</p>
        </div>

        <div className='flex items-center gap-6'>
          <img src={assets.searchIcon} className='h-5 w-5 cursor-pointer invert brightness-0 filter md:invert-0' alt="Search" />
          <button className='bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-900 transition-colors'>
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar