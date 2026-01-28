import React, { useContext, useEffect } from 'react'
import { Contextdata } from '../context/ContextProvider'

const Dashboard = () => {
    const { fetchBookings, allBookings, fetchRooms } = useContext(Contextdata);

    useEffect(() => {
        fetchBookings();
        fetchRooms();
    }, []);

    // Calculate total revenue
    const totalRevenue = allBookings.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <h1 className='text-3xl font-semibold'>Dashboard</h1>
                <p className='text-gray-500 mt-2'>Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations.</p>
            </div>

            <div className='flex gap-5 mt-4'>
                <div className='flex items-center gap-4 bg-slate-50 p-6 min-w-[300px] rounded-lg border border-slate-100'>
                    <div className='p-3 bg-blue-100 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-blue-500 font-medium'>Total Bookings</p>
                        <p className='text-gray-600 font-semibold text-lg'>{allBookings.length}</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 bg-slate-50 p-6 min-w-[300px] rounded-lg border border-slate-100'>
                    <div className='p-3 bg-blue-100 rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    <div>
                        <p className='text-blue-500 font-medium'>Total Revenue</p>
                        <p className='text-gray-600 font-semibold text-lg'>$ {totalRevenue}</p>
                    </div>
                </div>
            </div>

            <div className='mt-5'>
                <h2 className='text-xl font-semibold text-gray-500 mb-4'>Recent Bookings</h2>
                <div className='overflow-x-auto rounded-lg border border-slate-200'>
                    <table className='w-full bg-white text-sm text-left text-gray-500'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>User Name</th>
                                <th scope='col' className='px-6 py-3'>Room Name</th>
                                <th scope='col' className='px-6 py-3'>Total Amount</th>
                                <th scope='col' className='px-6 py-3'>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allBookings && allBookings.length > 0 ? (
                                allBookings.map((booking) => (
                                    <tr key={booking._id} className='bg-white border-b hover:bg-gray-50'>
                                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{booking.user?.username || 'Guest'}</td>
                                        <td className='px-6 py-4'>{booking.room?.roomType || 'Standard Room'}</td>
                                        <td className='px-6 py-4'>$ {booking.totalPrice}</td>
                                        <td className='px-6 py-4'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.isPaid ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                {booking.isPaid ? 'Completed' : 'Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center">No bookings found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
