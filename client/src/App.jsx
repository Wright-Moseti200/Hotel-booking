import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Rooms from './pages/Rooms'
import Contextprovider from './context/Contextprovider'

const App = () => {
  return (
    <BrowserRouter>
    <Contextprovider>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path="rooms" element={<Rooms/>}/>
    </Routes>
    </Contextprovider>
    </BrowserRouter>
  )
}

export default App