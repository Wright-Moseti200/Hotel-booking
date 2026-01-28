import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <>
            {/* Desktop Sidebar */}
            <div className='hidden md:block w-[18%] min-h-screen border-r-2 border-slate-200 bg-white sticky top-20'>
                <div className='flex flex-col gap-4 mt-6 text-[15px] pl-6'>
                    <NavLink to="/" className={({ isActive }) => isActive ? "flex items-center gap-3 px-3 py-2 bg-[#F2F3FF] border-r-4 border-[#0000FF] rounded-l cursor-pointer" : "flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-50 border-r-4 border-transparent"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink to="/add-room" className={({ isActive }) => isActive ? "flex items-center gap-3 px-3 py-2 bg-[#F2F3FF] border-r-4 border-[#0000FF] rounded-l cursor-pointer" : "flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-50 border-r-4 border-transparent"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p>Add Room</p>
                    </NavLink>
                    <NavLink to="/list-room" className={({ isActive }) => isActive ? "flex items-center gap-3 px-3 py-2 bg-[#F2F3FF] border-r-4 border-[#0000FF] rounded-l cursor-pointer" : "flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-50 border-r-4 border-transparent"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p>List Room</p>
                    </NavLink>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 left-0 bg-white h-screen z-50 w-64 transform transition-transform duration-300 md:hidden border-r shadow-lg overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex justify-between items-center p-4 border-b'>
                    <h2 className='text-xl font-bold'>Menu</h2>
                    <button onClick={() => setSidebarOpen(false)} className='p-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-col gap-4 mt-2 text-[15px]'>
                    <NavLink onClick={() => setSidebarOpen(false)} to="/" className={({ isActive }) => isActive ? "flex items-center gap-3 px-6 py-3 bg-[#F2F3FF] border-r-4 border-[#0000FF]" : "flex items-center gap-3 px-6 py-3 border-r-4 border-transparent active:bg-slate-50"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                        </svg>
                        <p>Dashboard</p>
                    </NavLink>
                    <NavLink onClick={() => setSidebarOpen(false)} to="/add-room" className={({ isActive }) => isActive ? "flex items-center gap-3 px-6 py-3 bg-[#F2F3FF] border-r-4 border-[#0000FF]" : "flex items-center gap-3 px-6 py-3 border-r-4 border-transparent active:bg-slate-50"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p>Add Room</p>
                    </NavLink>
                    <NavLink onClick={() => setSidebarOpen(false)} to="/list-room" className={({ isActive }) => isActive ? "flex items-center gap-3 px-6 py-3 bg-[#F2F3FF] border-r-4 border-[#0000FF]" : "flex items-center gap-3 px-6 py-3 border-r-4 border-transparent active:bg-slate-50"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p>List Room</p>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Sidebar
