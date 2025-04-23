import {BrowserRouter, Link, Router, Route, Routes} from "react-router-dom"
import PropertiesList from "./manage-properties/PropertiesList"

function Menu(){
    
    return(
    <>
    <BrowserRouter>

        <Link to="/"> Home </Link>
        <Link to="/properties"> Properties </Link>
        <Link> Link 3 </Link>

        <Routes>
            <Route path="/" />
            <Route path="/properties" element={<PropertiesList />} />
        </Routes>

    </BrowserRouter>
    

    </>
    )
}

export default Menu