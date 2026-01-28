import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddRoom from './pages/AddRoom';
import ListRoom from './pages/ListRoom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="bg-white min-h-screen text-slate-800 font-sans">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <div className='flex items-start'>
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className='w-full md:w-[80%] p-4 md:p-8 bg-white min-h-[calc(100vh-80px)]'>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/list-room" element={<ListRoom />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
