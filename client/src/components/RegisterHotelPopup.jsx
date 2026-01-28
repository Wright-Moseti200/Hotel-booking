import { Contextdata } from '../context/Contextprovider'
import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'

const RegisterHotelPopup = ({ isOpen, onClose }) => {
    const { registerHotel } = useContext(Contextdata);
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');

    // Unused state for fields present in UI but not in backend function yet
    // Keeping UI intact visually or just not sending them
    // But we need 'contact' which is missing in UI

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg p-8 relative shadow-2xl animate-fade-in relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    type="button"
                    className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-50 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                        List Your Property
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Join our network of exclusive hotels and reach millions of travelers.
                    </p>
                </div>

                <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    const result = await registerHotel({ name, city, address, contact });
                    if (result.success) onClose();
                }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Hotel Name</label>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Grand Hotel"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">City</label>
                            <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                                placeholder="New York"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Contact Number</label>
                            <input
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                type="text"
                                placeholder="+1 234 567 890"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Address</label>
                        <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            placeholder="123 Ocean Drive"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Description</label>
                        <textarea
                            placeholder="Tell us about your property..."
                            rows="3"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Price per Night ($)</label>
                        <input
                            type="number"
                            placeholder="199"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all bg-gray-50 focus:bg-white"
                        />
                    </div>

                    <button className="w-full bg-black text-white py-3.5 rounded-xl font-bold text-lg hover:bg-gray-800 transform active:scale-[0.98] transition-all shadow-lg mt-4">
                        Register Property
                    </button>
                </form>

            </div>
        </div>
    )
}

export default RegisterHotelPopup
