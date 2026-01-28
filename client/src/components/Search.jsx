import React from 'react'
import { assets } from '../assets/assets'

const Search = () => {
    return (
        <div className='w-full absolute bottom-[-50px] flex justify-center z-40 px-4'>
            <div className='bg-white shadow-xl rounded-full p-2 flex flex-col md:flex-row items-center gap-4 border border-gray-100 max-w-5xl w-full'>

                {/* Location */}
                <div className='flex items-center gap-3 px-6 py-2 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200'>
                    <img src={assets.locationIcon} alt="Location" className='w-5 h-5 opacity-50' /> {/* Assuming asset exists, else generic icon later */}
                    <div className='flex flex-col w-full'>
                        <label className='text-xs font-bold text-gray-800 uppercase tracking-wider'>Location</label>
                        <input
                            type="text"
                            placeholder="Where are you going?"
                            className='outline-none text-gray-600 text-sm w-full placeholder-gray-400'
                        />
                    </div>
                </div>

                {/* Check In */}
                <div className='flex items-center gap-3 px-6 py-2 w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200'>
                    {/* Icon placeholder if needed */}
                    <div className='flex flex-col w-full'>
                        <label className='text-xs font-bold text-gray-800 uppercase tracking-wider'>Check In</label>
                        <input
                            type="date"
                            className='outline-none text-gray-600 text-sm w-full bg-transparent'
                        />
                    </div>
                </div>

                {/* Check Out */}
                <div className='flex items-center gap-3 px-6 py-2 w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200'>
                    <div className='flex flex-col w-full'>
                        <label className='text-xs font-bold text-gray-800 uppercase tracking-wider'>Check Out</label>
                        <input
                            type="date"
                            className='outline-none text-gray-600 text-sm w-full bg-transparent'
                        />
                    </div>
                </div>

                {/* Guests */}
                <div className='flex items-center gap-3 px-6 py-2 w-full md:w-1/4'>
                    <div className='flex flex-col w-full'>
                        <label className='text-xs font-bold text-gray-800 uppercase tracking-wider'>Guests</label>
                        <input
                            type="number"
                            min="1"
                            defaultValue="1"
                            className='outline-none text-gray-600 text-sm w-full'
                        />
                    </div>
                </div>

                {/* Search Button */}
                <button className='bg-black hover:bg-gray-800 text-white p-4 rounded-full transition-all duration-300 shadow-lg transform hover:scale-105'>
                    <img src={assets.searchIcon} alt="Search" className='w-5 h-5 invert' />
                </button>

            </div>
        </div>
    )
}

export default Search
