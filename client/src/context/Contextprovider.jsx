/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react'

export const Contextdata = createContext();

const Contextprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // In a real app we might not have navigation inside context without a wrapper, 
  // but often people put it here. If it fails, user can pass it from components.
  // For now, I'll assume this component is inside BrowserRouter.

  // Helper to handle errors
  const handleError = (err) => {
    console.error(err);
    setError(err.message);
    setLoading(false);
  };

  // Signup
  const signup = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      setUser(data.user); // Assuming the API returns user info or we just set it manually
      // API doesn't return user object in payload based on controller reading, 
      // but sets a cookie. We might need a "check session" route or just assume logged in.
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
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      // Same as signup, cookie is set.
      // We could fetch user profile here if there was an endpoint for it.
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
      const response = await fetch('/api/user/logout', { method: 'GET' });
      const data = await response.json();
      if (data.success) {
        setUser(null);
        setBookings([]);
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
      const response = await fetch('/api/user/getbooking');
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

  // Book Room
  // Expected: { totalPrice, checkin, checkout, roomId, hotelId, guests }
  const bookRoom = async (bookingData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh bookings potentially
        getUserBookings();
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
      const response = await fetch('/api/user/registerhotel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotelData),
      });
      const data = await response.json();
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
      const response = await fetch('/api/user/stripepayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      });
      const data = await response.json();
      if (data.success && data.url) {
        window.location.href = data.url; // Auto-redirect
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
      const response = await fetch('/api/user/mpesaPayment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingid, phonenumber }),
      });
      const data = await response.json();
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
      loading,
      error,
      signup,
      login,
      logout,
      getUserBookings,
      bookRoom,
      registerHotel,
      stripePayment,
      mpesaPayment
    }}>
      {children}
    </Contextdata.Provider>
  )
}

export default Contextprovider