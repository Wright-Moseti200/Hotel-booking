/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

export const Contextdata = createContext();

const Contextprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendUrl = "https://hotel-booking-two-alpha.vercel.app";

  // Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [showHotelModal, setShowHotelModal] = useState(false);

  // Check for existing session
  const getAuthToken = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/gettoken`, { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        // Since we don't get full user details, we set a basic object to indicate logged-in state
        setUser({ token: data.token });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log("Session check failed", err);
      setUser(null);
    }
  };

  React.useEffect(() => {
    getAuthToken();
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
        credentials: 'include'

      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      toast.success("Signup successful!");
      getAuthToken(); // Update state from cookie
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
        credentials: 'include'

      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      toast.success("Login successful!");
      getAuthToken(); // Update state from cookie
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
      const response = await fetch(`${backendUrl}/api/user/logout`, { method: 'GET', credentials: 'include' });
      const data = await response.json();
      if (data.success) {
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
      const response = await fetch(`${backendUrl}/api/user/getbooking`, { credentials: 'include' });
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
  const getRooms = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/user/getrooms`, { credentials: 'include' });
      const data = await response.json();
      if (data.success && data.rooms) {
        setRooms(data.rooms);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Book Room
  // Expected: { totalPrice, checkin, checkout, roomId, hotelId, guests }
  const bookRoom = async (bookingData) => {
    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/user/booking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
        credentials: 'include'

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelData),
        credentials: 'include'

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
        credentials: 'include'

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingid, phonenumber }),
        credentials: 'include'

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

  return (
    <Contextdata.Provider value={{
      user,
      bookings,
      rooms,
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
      showAuthModal, setShowAuthModal,
      authMode, setAuthMode,
      showHotelModal, setShowHotelModal
    }}>
      {children}
    </Contextdata.Provider>
  )
}

export default Contextprovider