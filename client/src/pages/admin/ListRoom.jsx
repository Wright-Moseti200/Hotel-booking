import React, { useContext, useEffect } from 'react'
import { Contextdata } from '../../context/Contextprovider'

const ListRoom = () => {
    const { fetchRooms, allRooms, updateRoomStatus } = useContext(Contextdata);

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-2xl md:text-3xl font-semibold'>Room Listings</h1>
                <p className='text-gray-500 mt-2'>View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.</p>
            </div>

            <div className='mt-5'>
                <h2 className='text-lg font-medium text-gray-500 mb-4'>Total Hotels</h2>
                <div className='overflow-x-auto rounded-lg border border-slate-200'>
                    <table className='w-full bg-white text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>Name</th>
                                <th scope='col' className='px-6 py-3'>Facility</th>
                                <th scope='col' className='px-6 py-3'>Price / night</th>
                                <th scope='col' className='px-6 py-3 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allRooms && allRooms.length > 0 ? (
                                allRooms.map((room) => (
                                    <tr key={room._id} className='bg-white border-b hover:bg-gray-50'>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3'>
                                            <div className='w-10 h-10 bg-gray-200 rounded overflow-hidden'>
                                                <img src={room.images?.[0] || 'https://via.placeholder.com/40'} alt="Room" className='w-full h-full object-cover' />
                                            </div>
                                            {room.roomType}
                                        </td>
                                        <td className='px-6 py-4 text-xs max-w-xs truncate'>
                                            {Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities}
                                        </td>
                                        <td className='px-6 py-4'>$ {room.pricePerNight}</td>
                                        <td className='px-6 py-4 text-center'>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={!room.isAvailable}
                                                    onChange={() => updateRoomStatus(room._id)}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                            </label>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center">No rooms found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default ListRoom
