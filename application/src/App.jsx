
import React from 'react'

import Navbar from './components/NavBar/NavBar'


import './App.css'

import PropertyFilter from './components/manage-properties/PropertiesFilter'


import {BrowserRouter, Route, Routes} from "react-router-dom"

import PropertiesList from './components/manage-properties/PropertiesList'
import PropertyAdd from './components/manage-properties/PropertyAdd'
import PropertyUpdate from './components/manage-properties/PropertyUpdate'

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
        
        <main>
          <Routes>

            <Route path="/" />

            <Route path="/properties" element={<PropertyFilter/>} />
            <Route path="/property-add" element={<PropertyAdd />} />
            <Route path="/property-update" element={< PropertyUpdate />} />

            <Route path="/buyers" element={< BuyersList />} />
            <Route path="/buyer-add" element={< BuyerAdd />} />

            <Route path="/sellers" element={< SellersList />} />
            <Route path="/register" element={< Register />} />
          </Routes>       
        </main>
      </BrowserRouter>

  </div>
  
  )
}

export default App
