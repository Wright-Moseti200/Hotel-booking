import React, { useContext, useState } from 'react'
import { Contextdata } from '../context/ContextProvider'

const AddRoom = () => {
    const { addRoom, uploadImages } = useContext(Contextdata);
    const [images, setImages] = useState([]);
    const [roomType, setRoomType] = useState('Select Room Type');
    const [pricePerNight, setPricePerNight] = useState(0);
    const [amenities, setAmenities] = useState([]);

    const amenitiesList = ['Free WiFi', 'Free Breakfast', 'Room Service', 'Mountain View', 'Pool Access'];

    const handleAmenityChange = (amenity) => {
        setAmenities(prev =>
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        );
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages(prev => [...prev, file]);
        }
    };

    const handleSubmit = async () => {
        if (images.length === 0) {
            alert("Please upload at least one image");
            return;
        }

        let imageUrls = [];

        // Upload images one by one or in batch if API supported batch (API seems to support single file 'images' key or array? Controller says map req.files)
        // Controller uses req.files.map... implies multiple files in one request under strictly 'images' key? or 'image'?
        // Let's look at controller: "let urls=req.files.map((file)=>file.path);" -> it expects 'req.files'.
        // Multer usually handles 'req.files' if configured for array.
        // Let's assuming context `uploadImages` sends formData.
        // We will separate uploads or try one batch.

        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });

        const uploadResult = await uploadImages(formData);

        if (uploadResult.success && uploadResult.urls) {
            imageUrls = uploadResult.urls;
        } else {
            alert("Image upload failed: " + (uploadResult.message || "Unknown error"));
            return;
        }

        const roomData = {
            roomType,
            pricePerNight,
            amenities,
            images: imageUrls
        };

        const result = await addRoom(roomData);
        if (result.success) {
            alert('Room Added Successfully');
            setRoomType('Select Room Type');
            setPricePerNight(0);
            setAmenities([]);
            setImages([]);
        } else {
            alert('Failed to add room: ' + result.message);
        }
    };

    return (
        <div className='flex flex-col gap-6 max-w-4xl'>
            <div>
                <h1 className='text-2xl md:text-3xl font-semibold'>Add Room</h1>
                <p className='text-gray-500 mt-2'>Fill in the details carefully and accurate room details, pricing, and amenities, to enhance the user booking experience.</p>
            </div>

            <div className='flex flex-col gap-4'>
                <p className='font-medium'>Images</p>
                <div className='grid grid-cols-2 md:flex gap-4'>
                    {/* Fixed 4 slots for simplicity matching design */}
                    {[0, 1, 2, 3].map((index) => (
                        <label key={index} className='w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 overflow-hidden relative'>
                            {images[index] ? (
                                <img src={URL.createObjectURL(images[index])} alt="preview" className='w-full h-full object-cover' />
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3.75m-3-3.75-3 3.75M12 9.75V15.75M5.25 12a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0H5.25Z" />
                                    </svg>
                                    <span className='text-xs text-gray-400 mt-1'>Upload</span>
                                </>
                            )}
                            <input type="file" hidden onChange={handleImageChange} />
                        </label>
                    ))}
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-center'>
                <div className='flex flex-col gap-2 w-full md:w-1/3'>
                    <p className='font-medium'>Room Type</p>
                    <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500'
                    >
                        <option disabled>Select Room Type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Luxury Suite">Luxury Suite</option>
                    </select>
                </div>
                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <p className='font-medium'>Price /night</p>
                    <input
                        type="number"
                        value={pricePerNight}
                        onChange={(e) => setPricePerNight(e.target.value)}
                        className='border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='font-medium'>Amenities</p>
                <div className='flex flex-col gap-2'>
                    {amenitiesList.map((item) => (
                        <label key={item} className='flex items-center gap-2 cursor-pointer'>
                            <input
                                type="checkbox"
                                checked={amenities.includes(item)}
                                onChange={() => handleAmenityChange(item)}
                                className='accent-blue-600 w-4 h-4'
                            />
                            <span className='text-gray-600'>{item}</span>
                        </label>
                    ))}
                </div>
            </div>

            <button onClick={handleSubmit} className='bg-blue-600 text-white px-8 py-2 rounded shadow hover:bg-blue-700 w-fit mt-4'>Add Room</button>
        </div >
    )
}

export default AddRoom
