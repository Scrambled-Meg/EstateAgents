import {BrowserRouter, Link, Router, Route, Routes} from "react-router-dom"
import PropertiesList from "./manage-properties/PropertiesList"
import BuyersList from "./manage-buyer/BuyersList"

function Menu(){
    
    return(
    <>
    <BrowserRouter>

        <Link to="/"> Home </Link>
        <Link to="/properties"> Properties </Link>
        <Link to="/buyers"> Buyers </Link>
        <Link to="/sellers"> Sellers </Link>

        <Routes>
            <Route path="/" />
            <Route path="/properties" element={<PropertiesList />} />
            <Route path="/buyers" element={< BuyersList />} />
        </Routes>

    </BrowserRouter>
    

    </>
    )
}

export default Menu