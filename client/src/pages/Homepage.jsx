import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import Footer from '../components/Footer'
import { assets, roomsDummyData, exclusiveOffers, testimonials } from "../assets/assets.js"
import { Contextdata } from '../context/Contextprovider'

const Homepage = () => {
    const { user, rooms } = useContext(Contextdata);
    const navigate = useNavigate();

    const displayRooms = rooms && rooms.length > 0 ? rooms : [];


    return (
        <>
            {/* Hero Section */}
            <div className='relative h-[90vh] w-full'>
                <div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{ backgroundImage: `url(${assets.heroimage})` }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                <Navbar />

                <main className='relative z-10 flex flex-col h-full justify-center items-center px-4'>
                    <div className='flex flex-col items-center text-center max-w-4xl pt-20'>
                        <span className='bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide border border-white/30'>
                            The Ultimate Hotel Experience
                        </span>

                        <h1 className='text-white text-5xl md:text-7xl font-serif mt-8 font-bold leading-tight'>
                            Discover Your Perfect <br /> Gateway Destination
                        </h1>

                        <p className='mt-6 text-gray-200 text-lg md:text-xl max-w-2xl font-light leading-relaxed'>
                            Unparalleled luxury and comfort await at the world's most exclusive
                            hotels and resorts. Start your journey today.
                        </p>

                        {/* Float Search Bar */}
                        <Search />
                    </div>
                </main>
            </div>


            {/* Recommended Hotels Section - Only for Logged In Users */}
            {user && (
                <section className='container mx-auto px-4 md:px-20 mt-32'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-serif font-medium text-gray-900 mb-4'>Recommended for You</h2>
                        <p className='text-gray-500 max-w-2xl mx-auto'>
                            Based on your preferences and previous stays, we've curated a list of exclusive properties just for you.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {[...displayRooms].reverse().slice(0, 4).map((room) => (
                            <div
                                key={room._id}
                                onClick={() => navigate(`/rooms/${room._id}`)}
                                className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100'
                            >
                                <div className='relative overflow-hidden h-64'>
                                    <img
                                        src={room.images[0]}
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                        alt={room.hotel.name}
                                    />
                                    <div className='absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider'>
                                        Recommended
                                    </div>
                                </div>
                                <div className='p-5'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <h3 className='font-serif text-xl font-medium text-gray-900'>{room.hotel.name}</h3>
                                        <div className='flex items-center gap-1 text-orange-400'>
                                            <img src={assets.starIconFilled} className='w-4 h-4' />
                                            <span className='text-sm font-bold text-gray-700'>4.8</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-1 text-gray-500 text-sm mb-4'>
                                        <img src={assets.locationIcon} className='w-4 h-4 opacity-60' />
                                        <span>{room.hotel.city}</span>
                                    </div>

                                    <div className='flex justify-between items-center mt-4 pt-4 border-t border-gray-100'>
                                        <div>
                                            <span className='text-2xl font-bold text-gray-900'>${room.pricePerNight}</span>
                                            <span className='text-gray-400 text-sm'>/night</span>
                                        </div>
                                        <button className='border border-gray-200 hover:border-black hover:bg-gray-50 text-gray-900 px-5 py-2 rounded-lg text-sm font-medium transition-colors'>
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Destination Section */}
            <section className='container mx-auto px-4 md:px-20 mt-32'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl font-serif font-medium text-gray-900 mb-4'>Featured Destination</h2>
                    <p className='text-gray-500 max-w-2xl mx-auto'>
                        Discover our handpicked selection of exceptional properties around the world,
                        offering unparalleled luxury and unforgettable experiences.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {displayRooms.slice(0, 4).map((room) => (
                        <div
                            key={room._id}
                            onClick={() => navigate(`/rooms/${room._id}`)}
                            className='bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100'
                        >
                            <div className='relative overflow-hidden h-64'>
                                <img
                                    src={room.images[0]}
                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                    alt={room.hotel.name}
                                />
                                <div className='absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider'>
                                    Best Seller
                                </div>
                            </div>
                            <div className='p-5'>
                                <div className='flex justify-between items-start mb-2'>
                                    <h3 className='font-serif text-xl font-medium text-gray-900'>{room.hotel.name}</h3>
                                    <div className='flex items-center gap-1 text-orange-400'>
                                        <img src={assets.starIconFilled} className='w-4 h-4' />
                                        <span className='text-sm font-bold text-gray-700'>4.5</span>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1 text-gray-500 text-sm mb-4'>
                                    <img src={assets.locationIcon} className='w-4 h-4 opacity-60' />
                                    <span>{room.hotel.city}</span>
                                </div>

                                <div className='flex justify-between items-center mt-4 pt-4 border-t border-gray-100'>
                                    <div>
                                        <span className='text-2xl font-bold text-gray-900'>${room.pricePerNight}</span>
                                        <span className='text-gray-400 text-sm'>/night</span>
                                    </div>
                                    <button className='border border-gray-200 hover:border-black hover:bg-gray-50 text-gray-900 px-5 py-2 rounded-lg text-sm font-medium transition-colors'>
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-center mt-12'>
                    <button className='bg-white border border-gray-200 text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors shadow-sm'>
                        View All Destinations
                    </button>
                </div>
            </section>

            {/* Exclusive Offers Section */}
            <section className='container mx-auto px-4 md:px-20 mt-32'>
                <div className='flex flex-col md:flex-row justify-between items-end mb-12'>
                    <div className='max-w-xl'>
                        <h2 className='text-4xl font-serif font-medium text-gray-900 mb-4'>Exclusive Offers</h2>
                        <p className='text-gray-500'>
                            Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.
                        </p>
                    </div>
                    <button className='hidden md:flex items-center gap-2 text-gray-900 font-medium hover:text-gray-600 transition'>
                        View All Offers <img src={assets.arrowIcon} className='w-4 h-4 mt-1' />
                    </button>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    {exclusiveOffers.map((offer) => (
                        <div key={offer._id} className='relative h-96 rounded-3xl overflow-hidden group cursor-pointer'>
                            <img
                                src={offer.image}
                                className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                alt={offer.title}
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent'></div>

                            <div className='absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full text-sm font-bold'>
                                {offer.priceOff}% OFF
                            </div>

                            <div className='absolute bottom-0 left-0 p-8 w-full'>
                                <h3 className='text-white text-2xl font-serif font-medium mb-2'>{offer.title}</h3>
                                <p className='text-gray-200 text-sm mb-6 line-clamp-2'>{offer.description}</p>
                                <div className='flex justify-between items-center'>
                                    <span className='text-white/60 text-xs uppercase tracking-wider'>Expires {offer.expiryDate}</span>
                                    <button className='text-white flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all'>
                                        View Offers <img src={assets.arrowIcon} className='w-4 h-4 invert filter mt-0.5' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='bg-white py-24 mt-32'>
                <div className='container mx-auto px-4 md:px-20'>
                    <div className='text-center mb-16'>
                        <h2 className='text-4xl font-serif font-medium text-gray-900 mb-6'>What Our Guests Say</h2>
                        <p className='text-gray-500 max-w-2xl mx-auto'>
                            Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className='bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100'>
                                <div className='flex items-center gap-4 mb-6'>
                                    <img
                                        src={testimonial.image}
                                        className='w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm'
                                        alt={testimonial.name}
                                    />
                                    <div>
                                        <h4 className='font-bold text-gray-900'>{testimonial.name}</h4>
                                        <p className='text-gray-500 text-xs uppercase tracking-wider'>{testimonial.address}</p>
                                    </div>
                                </div>

                                <div className='flex gap-1 mb-4'>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <img key={i} src={assets.starIconFilled} className='w-4 h-4 text-orange-400' />
                                    ))}
                                </div>

                                <p className='text-gray-600 leading-relaxed italic'>
                                    "{testimonial.review}"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Homepage