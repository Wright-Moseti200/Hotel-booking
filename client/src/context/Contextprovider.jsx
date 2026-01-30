/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify';

export const Contextdata = createContext();

const Contextprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [allBookings, setAllBookings] = useState([]); // Admin
  const [allRooms, setAllRooms] = useState([]); // Admin
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = "https://hotel-booking-two-alpha.vercel.app";

  // Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [showHotelModal, setShowHotelModal] = useState(false);

  // Check for existing session
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setUser({ token });
    }
    getRooms();
  }, []);

  // In a real app we might not have navigation inside context without a wrapper, 
  // but often people put it here. If it fails, user can pass it from components.
  // For now, I'll assume this component is inside BrowserRouter.

  // Helper to handle errors
  const handleError = (err) => {
    console.error(err);
    const message = err.message || "An unexpected error occurred";
    setError(message);
    toast.error(message);
    setLoading(false);
  };

  // Signup
  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      toast.success("Signup successful!");
      localStorage.setItem('auth-token', data.token);
      setUser({ token: data.token });
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      toast.success("Login successful!");
      localStorage.setItem('auth-token', data.token);
      setUser({ token: data.token });
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/logout`, {
        method: 'GET',
        headers: { 'auth-token': localStorage.getItem('auth-token') }
      });
      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('auth-token');
        setUser(null);
        setBookings([]);
        toast.success("Logged out successfully");
      }
      return data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Get User Bookings
  const getUserBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/getbooking`, {
        headers: { 'auth-token': localStorage.getItem('auth-token') }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        // If 404/no bookings, just empty the list
        setBookings([]);
      }
      return data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };





  // Get All Rooms
  // Get All Rooms
  const getRooms = async () => {
    setLoading(true);
    try {
      // getrooms is public, so standard call is fine, but passing token doesn't hurt if we want to personalize later
      const response = await fetch(`${backendUrl}/api/user/getrooms`);
      const data = await response.json();
      if (data.success && data.rooms) {
        setRooms(data.rooms);
      } else {
        throw new Error(data.message || "Failed to fetch rooms");
      }
    } catch (err) {
      console.log(err);
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Book Room
  // Expected: { totalPrice, checkin, checkout, roomId, hotelId, guests }
  const bookRoom = async (bookingData) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh bookings potentially
        getUserBookings();
        toast.success("Room booked successfully!");
      } else {
        throw new Error(data.message || "Booking failed");
      }
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Register Hotel
  // Expected: { name, address, city, contact }
  const registerHotel = async (hotelData) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/registerhotel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(hotelData),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Hotel registered successfully!");
      } else {
        throw new Error(data.message || "Failed to register hotel");
      }
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Stripe Payment
  const stripePayment = async (bookingId) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/stripepayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({ bookingId }),
      });
      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url; // Auto-redirect
      } else {
        toast.error(data.message || "Stripe payment initialization failed");
      }
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Mpesa Payment
  const mpesaPayment = async (bookingid, phonenumber) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/mpesaPayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({ bookingid, phonenumber }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Mpesa payment initiated. Check your phone.");
      } else {
        toast.error(data.message || "Mpesa payment failed");
      }
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Admin Functions

  // Fetch All Bookings (Admin)
  const fetchAdminBookings = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/admin/getbookings`, {
        // getbookings in admin is public? adminRoutes says: adminRoutes.get("/getbookings", getbooking);
        // It seems it's public based on router? But ideally should be protected.
        // Let's check adminRoutes again. "adminRoutes.get("/getbookings", getbooking);" -> No auth middleware.
        // Wait, the plan was to merge contexts. Admin context was using request interceptor with token.
        // Even if route is public, passing token doesn't hurt.
        // Wait, "getbooking" controller doesn't use req.user.
        // So it is public!
      });
      const data = await response.json();
      if (data.success) {
        setAllBookings(data.bookings);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch All Rooms (Admin listing)
  const fetchAdminRooms = async () => {
    // Renamed from fetchRooms to avoid conflict with user getRooms, but mapped to fetchRooms in export for Admin pages if possible?
    // Actually Admin pages use 'fetchRooms'. I will export this as 'fetchRooms' ? No, 'getRooms' exists.
    // I will export this as 'fetchRooms' property in value object to satisfy Admin components,
    // but inside this file I call it fetchAdminRooms to avoid naming collision with 'getRooms' function.
    // Wait, 'getRooms' uses `/api/user/getrooms`.
    // Admin uses `/api/admin/getroomlistings`.

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/admin/getroomlistings`);
      const data = await response.json();
      if (data.success) {
        setAllRooms(data.rooms);
      }
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  // Add Room
  const addRoom = async (roomData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/admin/addrooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify(roomData)
      });
      const data = await response.json();
      if (data.success) {
        fetchAdminRooms(); // Refresh list
        toast.success("Room added successfully!");
      }
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Upload Images
  const uploadImages = async (formData) => {
    setLoading(true);
    try {
      // Must set Content-Type to multipart/form-data for file uploads
      // Fetch: when sending FormData, do NOT set Content-Type header manually, let browser set it with boundary.
      // But we need auth token?
      // Yes, if route requires it. "adminRoutes.post("/uploadimages", ... uploadimages)" - No auth middleware in route?
      // "adminRoutes.post("/uploadimages", upload.array("images", 5), uploadimages);" -> No 'auth' middleware.
      // So no token needed.

      const response = await fetch(`${backendUrl}/api/admin/uploadimages`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Image uploaded successfully!");
      }
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update Room Status
  const updateRoomStatus = async (roomId) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/admin/updateroomstatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        },
        body: JSON.stringify({ roomId })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchAdminRooms(); // Refresh the list
      }
      return data;
    } catch (err) {
      handleError(err);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <Contextdata.Provider value={{
      user,
      bookings,
      rooms,
      allBookings, // Admin
      allRooms, // Admin (mapped to allRooms)
      loading,
      error,
      signup,
      login,
      logout,
      getUserBookings,
      getRooms,
      bookRoom,
      registerHotel,
      stripePayment,
      mpesaPayment,

      // Admin Exports
      fetchAdminBookings, // Admin component expects 'fetchBookings' ? No, I updated Dashboard to use fetchAdminBookings
      fetchRooms: fetchAdminRooms, // Admin component expects 'fetchRooms'. I map fetchAdminRooms to fetchRooms. 
      // User component expects 'getRooms'. 
      // So `fetchRooms` -> `fetchAdminRooms` (Admin). `getRooms` -> `getRooms` (User).
      addRoom,
      uploadImages,
      updateRoomStatus,

      showAuthModal, setShowAuthModal,
      authMode, setAuthMode,
      showHotelModal, setShowHotelModal
    }}>
      {children}
    </Contextdata.Provider>
  )
}

export default Contextprovider