import {BrowserRouter, Link, Router, Route, Routes} from "react-router-dom"

import PropertiesList from "./manage-properties/PropertiesList"
import PropertyAdd from "./manage-properties/PropertyAdd"

import BuyersList from "./manage-buyer/BuyersList"
import BuyerAdd from "./manage-buyer/BuyerAdd"

import SellersList from "./manage-seller/SellersList"
import SellerAdd from "./manage-seller/SellerAdd"


function Menu(){
    
    return(
    <>
    <BrowserRouter>

        <Link to="/"> Home </Link>
        <Link to="/properties"> Properties </Link>
        <Link to="/property-add"> Register a Property </Link>
        <Link to="/buyers"> Buyers </Link>
        <Link to="/buyer-add"> Register as a Buyer </Link>
        <Link to="/sellers"> Sellers </Link>
        <Link to="/seller-add"> Register as a Seller </Link>

        <Routes>
            <Route path="/" />
            <Route path="/properties" element={<PropertiesList />} />
            <Route path="/property-add" element={<PropertyAdd />} />
            <Route path="/buyers" element={< BuyersList />} />
            <Route path="/buyer-add" element={< BuyerAdd />} />
            <Route path="/sellers" element={< SellersList />} />
            <Route path="/seller-add" element={< SellerAdd />} />
        </Routes>

    </BrowserRouter>

    
    

    </>
    )
}

export default Menu