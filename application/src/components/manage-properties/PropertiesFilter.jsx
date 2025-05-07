import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import House from "./images/house"

import "./properties.css"

import { FaBath } from "react-icons/fa";
import { LuFence } from "react-icons/lu";
import { IoBed } from "react-icons/io5";



 
const PropertyFilter = () => {
    const [properties, setproperties] = useState([])
    const [filters, setFilters] = useState({type: '', bathroom: '', bedroom: '', garden: ''})
    const [sellerData, setSellerData] = useState ([])
 
    const getData = () => {
        let fetchSellers = fetch("http://localhost:3000/seller")
        fetchSellers.then( (response) => response.json().then( (data) => setSellerData(data) ))
    }
 
    const findSeller=(sellerId) => {
        let seller = sellerData.filter( (seller) => seller.id == sellerId)
        return seller.length == 0 ? "Not Known" : seller[0]
    }
 
    useEffect (() =>{
        fetch("http://localhost:3000/property")
        .then((res) => res.json())
        .then(data => {
            const forSale = data.filter(property => property.status === 'FOR SALE')   
            setproperties(forSale)
        })
    }, [])
 
    const handleChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value})
    }
 
    const resetFilters = () => {
        setFilters({type: '', bathroom: '', bedroom: '', garden: '', minPrice: '', maxPrice: ''})
    }

    const min = filters.minPrice ? parseFloat(filters.minPrice) : null
    const max = filters.maxPrice ? parseFloat(filters.maxPrice) : null
 
    const filteredProperties = properties.filter((property) => {
        const propertyPrice = parseFloat(property.price)
        return (
            (min === null || propertyPrice >= min) &&
            (max === null || propertyPrice <= max) &&
            (filters.type === '' || property.type === filters.type) &&
            (filters.bathroom === '' || property.bathroom === filters.bathroom)&&
            (filters.bedroom === '' || property.bedroom === filters.bedroom)&&
            (filters.garden === '' || property.garden === filters.garden)
             )
    })
 
    useEffect(getData, [])
 
    return (
        <>
           <header className="center">
        
            <Link className="reset-btn" to="/property-add"> Register a Property </Link> 
            <Link className="reset-btn" to="/property-update"> Update a Property </Link> 
            <Link className="reset-btn" to="/properties-withdrawn"> View Withdrawn Properties </Link> 
            <br /></header> 
        <br /><br />
            <h1 className="center"> Properties for Sale </h1> <br />

            <div className="filter-bar" style={{marginBotton:'1rem'}}>
                <select className="menu-select" name='type' onChange={handleChange} value={filters.type}>
                    <option value=''>Types</option>
                        <option value="Bungalow">Bungalow</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Studio">Studio</option>
                        <option value="Commercial">Commercial</option>
                </select>
                <select className="menu-select" name='bathroom' onChange={handleChange} value={filters.bathroom}>
                    <option value=''>Bathrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select className="menu-select" name='bedroom' onChange={handleChange} value={filters.bedroom}>
                    <option value=''>Bedrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <select className="menu-select" name='garden' onChange={handleChange} value={filters.garden}>
                    <option value=''>Garden</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
                <input className="menu-select" type="number" name='minPrice' placeholder="Min Price" value={filters.minPrice} onChange={handleChange}/>
                <input className="menu-select" type="number" name='maxPrice' placeholder="Max Price" value={filters.maxPrice} onChange={handleChange}/>
         
                <button className="reset-btn" onClick={resetFilters}>Reset Filters</button> 

            </div>
            <br /><br />
            <div className="propGrid">  

                
               

                {filteredProperties.map(property => (
                    <div className="propCard"><br />
                        <h1 id="propCardAddress"> {property.address}  </h1> 
                        <h3 id="propCardPostcode"> {property.postcode} </h3>
                        <h2> £{property.price} </h2>   
                    
                        <House />

                        <section>

                            <table class="tableCard">
                                <tr>
                                    <td> <IoBed className="icon-list"/> </td>
                                    <td> <h3> {property.bedroom} </h3> </td>
                                    <td> <FaBath className="icon-list"/> </td>
                                    <td> <h3> {property.bathroom} </h3> </td>
                                    { property.garden == "0" ?<></> :  <> <td> <LuFence className="icon-list"/></td>
                                    <td></td> </>}
                                    
                                </tr>

                            </table>
                        </section>
                        <br />
                        <h2>This {property.type} property is being sold by: </h2>
                        <h2> {findSeller(property.sellerId).firstName} {findSeller(property.sellerId).surname}  </h2><br />
                        <Link className="reset-btn" to="/properties-booking"> Book a Viewing </Link> <br />
                        </ div>
                ))}

                {filteredProperties.length == 0 ? 
                    <div className="propCard2">  
                    <h2> Unfortunately no properties were found for your search</h2>
                    <h3> You may need to adjust your search criteria </h3>
                    </div> 
                    
                     : ""}
            
            </div>
            <br /><br /><br />
    </>
    )
}
 
export default PropertyFilter