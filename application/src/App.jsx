
import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'

import Navbar from './components/NavBar/NavBar'

import PropertyFilter from './components/manage-properties/PropertiesFilter'
import PropertyAdd from './components/manage-properties/PropertyAdd'
import PropertyUpdate from './components/manage-properties/PropertyUpdate'
import PropertiesWithdrawn from './components/manage-properties/PropertiesWithdrawn'

import BuyersList from './components/manage-buyer/BuyersList'
import BuyerAdd from './components/manage-buyer/BuyerAdd'

import SellersList from './components/manage-seller/SellersList'
import SellerAdd from './components/manage-seller/SellerAdd'

import Register from './components/Register/register'


const App = () => {

  return (
    <div>
      
      <BrowserRouter>
        
        <Navbar />
        
        
          <Routes>

            <Route path="/" />

            <Route path="/properties" element={<PropertyFilter/>} />
            <Route path="/property-add" element={<PropertyAdd />} />
            <Route path="/property-update" element={< PropertyUpdate />} />
            <Route path="/properties-withdrawn" element={< PropertiesWithdrawn />} />

            <Route path="/buyers" element={< BuyersList />} />
            <Route path="/buyer-add" element={< BuyerAdd />} />

            <Route path="/sellers" element={< SellersList />} />
            <Route path="/seller-add" element={< SellerAdd />} />

            <Route path="/register" element={< Register />} />
          </Routes>       
        
      </BrowserRouter>

  </div>
  
  )
}

export default App
