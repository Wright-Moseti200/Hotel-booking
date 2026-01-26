import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='w-full bg-gray-50 py-16 mt-20'>
      <div className='container mx-auto px-4 md:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-10'>
          {/* Logo Section */}
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <span className="font-bold text-xl text-gray-800">QuickStay</span>
            </div>
            <p className='text-gray-500 text-sm leading-relaxed'>
              The best hotel booking experience for your next trip. Discover polished stays and luxury resorts.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className='font-bold text-gray-800 mb-4'>Company</h3>
            <ul className='flex flex-col gap-2 text-gray-500 text-sm'>
              <li className='cursor-pointer hover:text-black'>About Us</li>
              <li className='cursor-pointer hover:text-black'>Careers</li>
              <li className='cursor-pointer hover:text-black'>Press</li>
              <li className='cursor-pointer hover:text-black'>Blog</li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className='font-bold text-gray-800 mb-4'>Support</h3>
            <ul className='flex flex-col gap-2 text-gray-500 text-sm'>
              <li className='cursor-pointer hover:text-black'>Help Center</li>
              <li className='cursor-pointer hover:text-black'>Terms of Service</li>
              <li className='cursor-pointer hover:text-black'>Legal</li>
              <li className='cursor-pointer hover:text-black'>Privacy Policy</li>
            </ul>
          </div>

          {/* Socials & Newsletter */}
          <div>
            <h3 className='font-bold text-gray-800 mb-4'>Follow Us</h3>
            <div className='flex gap-4 mb-6'>
              <img src={assets.facebookIcon} className='h-5 w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity' />
              <img src={assets.twitterIcon} className='h-5 w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity' />
              <img src={assets.instagramIcon} className='h-5 w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity' />
              <img src={assets.linkendinIcon} className='h-5 w-5 cursor-pointer opacity-60 hover:opacity-100 transition-opacity' />
            </div>
          </div>
        </div>

        <div className='border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400'>
          <p>&copy; 2025 QuickStay. All rights reserved.</p>
          <div className='flex gap-4 mt-4 md:mt-0'>
            <p>Privacy</p>
            <p>Terms</p>
            <p>Sitemap</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer