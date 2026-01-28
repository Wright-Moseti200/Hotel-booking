import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AddRoom from './pages/AddRoom';
import ListRoom from './pages/ListRoom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="bg-white min-h-screen text-slate-800 font-sans">
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <div className='w-[80%] p-8 bg-white min-h-[calc(100vh-80px)]'>
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
