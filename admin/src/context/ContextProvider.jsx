
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


export const Contextdata = createContext();

const ContextProvider = ({ children }) => {

  const [allBookings, setAllBookings] = useState([]);
  const [allRooms, setAllRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base URL for API requests
  const api = axios.create({
    baseURL: 'http://localhost:4000/api/user',
    withCredentials: true, // Important for cookies
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Handle errors uniformly
  const handleError = (err) => {
    console.error(err);
    let message = 'An unexpected error occurred';
    if (err.response && err.response.data && err.response.data.message) {
      message = err.response.data.message;
    } else if (err.message) {
      message = err.message;
    }
    setError(message);
    toast.error(message);
  };



  // Fetch All Bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/getbookings'); // Note: Endpoint in adminRoutes is /getbookings, verify usage in adminRoutes.js
      if (response.data.success) {
        setAllBookings(response.data.bookings);
      }
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  // Fetch All Rooms
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await api.get('/getroomlistings');
      if (response.data.success) {
        setAllRooms(response.data.rooms);
      }
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  // Add Room
  const addRoom = async (roomData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/addrooms', roomData);
      setLoading(false);
      if (response.data.success) {
        fetchRooms(); // Refresh list
        toast.success("Room added successfully!");
      }
      return response.data;
    } catch (err) {
      handleError(err);
      setLoading(false);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // Upload Images
  const uploadImages = async (formData) => {
    setLoading(true);
    try {
      // Must set Content-Type to multipart/form-data for file uploads
      const response = await api.post('/uploadimages', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      toast.success("Image uploaded successfully!");
      return response.data;
    } catch (err) {
      handleError(err);
      setLoading(false);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // Update Room Status
  const updateRoomStatus = async (roomId) => {
    setLoading(true);
    try {
      const response = await api.post('/updateroomstatus', { roomId });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchRooms(); // Refresh the list to show new status
      }
      setLoading(false);
      return response.data;
    } catch (err) {
      handleError(err);
      setLoading(false);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  return (
    <Contextdata.Provider value={{
      allBookings,
      allRooms,
      loading,
      error,

      fetchBookings,
      fetchRooms,
      addRoom,
      uploadImages,
      updateRoomStatus,
      setError
    }}>
      {children}
    </Contextdata.Provider>
  );
};

export default ContextProvider;