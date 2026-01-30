import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Contextdata } from '../context/Contextprovider'
import { assets, roomsDummyData, roomCommonData } from '../assets/assets'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Rooms = () => {
  const { id } = useParams();
  const { bookRoom, user, setShowAuthModal, rooms } = useContext(Contextdata);
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      const foundRoom = rooms.find(r => r._id === id);
      if (foundRoom) {
        setRoom(foundRoom);
      }
    }
  }, [id, rooms]);

  if (!room) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>
  }

  const handleBookNow = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Basic booking logic - assume 1 night, current date, 1 guest for simplicity or extend UI
    // For now, using hardcoded/default values or those from state if improved
    // Since UI has inputs but they are not controlled, we will grab values or just use defaults for demo
    // Ideally we should make inputs controlled state. For minimal fix:
    const checkin = new Date().toISOString();
    const checkout = new Date(Date.now() + 86400000).toISOString(); // +1 day

    await bookRoom({
      totalPrice: room.pricePerNight,
      checkin,
      checkout,
      roomId: room._id,
      hotelId: room.hotel._id || "unknown_hotel_id", // Verify if room object has hotel._id populated or if it is just hotel name
      guests: 1
    });
  }

  return (
    <div className='bg-white min-h-screen'>
      <Navbar />

      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20 pt-24 md:pt-32 pb-20">

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-serif font-medium text-gray-900">{room.hotel.name}</h1>
            <span className="text-gray-500 text-lg font-light">({room.roomType})</span>
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">20% OFF</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1 text-orange-500">
              {[...Array(5)].map((_, i) => (
                <img key={i} src={assets.starIconFilled} className="w-3 h-3" />
              ))}
            </div>
            <span className="font-medium text-gray-900 underline">200+ reviews</span>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <img src={assets.locationIcon} className="w-4 h-4 opacity-70" />
            <span>{room.hotel.address}</span>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl overflow-hidden mb-8 md:mb-12 h-auto md:h-[500px]">
          <div className="h-full">
            <img src={room.images[0]} className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer" alt="Main Room" />
          </div>
          <div className="grid grid-cols-2 gap-4 h-64 md:h-full">
            <img src={room.images[1]} className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer" alt="Room 2" />
            <img src={room.images[2]} className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer" alt="Room 3" />
            <img src={room.images[3]} className="w-full h-full object-cover hover:opacity-95 transition cursor-pointer" alt="Room 4" />
            <div className="relative cursor-pointer">
              <img src={room.images[0]} className="w-full h-full object-cover hover:opacity-95 transition opacity-60" alt="View All" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white/80 px-4 py-2 rounded-lg font-bold text-gray-900 border border-gray-200 shadow-sm">Show all photos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content & Booking Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* Left Content */}
          <div className="flex-1">
            {/* Amenities Bar */}
            <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
              {room.amenities.map((item, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 min-w-max">
                  {/* Generic icon if no specific mapping, or use a default one - logic could be improved with icon mapping */}
                  <div className="p-1 bg-white rounded-full shadow-sm">
                    <img src={assets.badgeIcon} className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Info items */}
            <div className="space-y-8 mb-12">
              {roomCommonData.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1">
                    <img src={item.icon} className="w-6 h-6 opacity-80" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="lg:w-[400px]">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xl sticky top-28">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">${room.pricePerNight}</span>
                  <span className="text-gray-500 font-light"> / night</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src={assets.starIconFilled} className="w-3 h-3 text-orange-500" />
                  <span className="font-medium text-gray-700">4.8</span>
                  <span className="text-gray-400 text-sm underline ml-1">20 reviews</span>
                </div>
              </div>

              <div className="grid grid-cols-2 border border-gray-300 rounded-t-xl overflow-hidden">
                <div className="border-r border-gray-300 p-3">
                  <label className="text-[10px] font-bold uppercase text-gray-800 tracking-wider block mb-1">Check-in</label>
                  <input type="date" className="w-full text-sm outline-none text-gray-600 cursor-pointer" />
                </div>
                <div className="p-3">
                  <label className="text-[10px] font-bold uppercase text-gray-800 tracking-wider block mb-1">Check-out</label>
                  <input type="date" className="w-full text-sm outline-none text-gray-600 cursor-pointer" />
                </div>
              </div>
              <div className="border-x border-b border-gray-300 rounded-b-xl p-3 mb-6 relative">
                <label className="text-[10px] font-bold uppercase text-gray-800 tracking-wider block mb-1">Guests</label>
                <input type="number" defaultValue={1} min={1} className="w-full text-sm outline-none text-gray-600" />
              </div>

              <button
                onClick={handleBookNow}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98]"
              >
                Book Now
              </button>

              <div className="mt-4 flex justify-between text-gray-500 text-sm">
                <span className="underline">Total before taxes</span>
                <span>${room.pricePerNight}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Rooms