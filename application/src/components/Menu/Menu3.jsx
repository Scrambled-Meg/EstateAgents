
import "./Menu.css"

import {BrowserRouter, Link, Router, Route, Routes} from "react-router-dom"

import PropertiesList from "../manage-properties/PropertiesList"
import PropertyAdd from "../manage-properties/PropertyAdd"
import PropertyUpdate from "../manage-properties/PropertyUpdate"

import BuyersList from "../manage-buyer/BuyersList"
import BuyerAdd from "../manage-buyer/BuyerAdd"

import SellersList from "../manage-seller/SellersList"
import SellerAdd from "../manage-seller/SellerAdd"

import MenuBanner from "./menubanner"



const Header = () => {
  return (
    <header>
      <div className = "head-text">
        <div className = "head-image">
          <MenuBanner />
        </div>
        <div className='text-on-image'>
          <BrowserRouter>

            <Link className="menu-btn" to="/"> Home </Link>

            <Link className="menu-btn" to="/properties"> Properties </Link>
            <Link className="menu-btn" to="/property-add"> Register a Property </Link>
            <Link className="menu-btn" to="/property-update"> Update a Property </Link>

            <Link className="menu-btn" to="/buyers"> Buyers </Link>
            <Link className="menu-btn" to="/buyer-add"> Register as a Buyer </Link>

            <Link className="menu-btn" to="/sellers"> Sellers </Link>
            <Link className="menu-btn" to="/seller-add"> Register as a Seller </Link>

            <Routes>
                <Route path="/" />

                <Route path="/properties" element={<PropertiesList />} />
                <Route path="/property-add" element={<PropertyAdd />} />
                <Route path="/property-update" element={< PropertyUpdate />} />

                <Route path="/buyers" element={< BuyersList />} />
                <Route path="/buyer-add" element={< BuyerAdd />} />

                <Route path="/sellers" element={< SellersList />} />
                <Route path="/seller-add" element={< SellerAdd />} />
            </Routes>

          </BrowserRouter>

        </div>
      </div>
    </header>
  )
}

export default Header