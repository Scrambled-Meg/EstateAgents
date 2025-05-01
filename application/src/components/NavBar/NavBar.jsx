import {Link} from "react-router-dom";
import NavBarImg from "./NavBarImg";
import "./NavBar.css"
 
 
const NavBar = () => {


    return (
        //navbar which is displayed above each page, links are declared here but where each of these links lead is declared via the app.js
        
        <div className = "head-text">

            <div className = "head-image">
            <NavBarImg/>
            </div>

            <h2 className="name-on-image"> DOGHOUSE & CO LLP </h2>

            <div className='text-on-image'>
                <Link className="menu-btn" to="/"> Home </Link>
                <Link className="menu-btn" to="/properties"> Properties </Link>                
                <Link className="menu-btn" to="/property-update"> Update a Property </Link>
                <Link className="menu-btn" to="/buyers"> Buyers </Link>
                <Link className="menu-btn" to="/sellers"> Sellers </Link>
                <Link className="menu-btn" to="/register"> Register with us </Link>
            </div>

        </div>
          
    )}

export default NavBar