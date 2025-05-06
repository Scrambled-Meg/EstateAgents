import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import House from "./images/house"

import "./properties.css"

import { FaBath } from "react-icons/fa";
import { LuFence } from "react-icons/lu";
import { IoBed } from "react-icons/io5";



 
const PropertiesWithdrawn= () => {

    let [propertyData, setProperty] = useState ([])
    let [sellerData, setSellerData] = useState ([])
    let [buyerData, setBuyerData] = useState ([])

    

    let processData = (records) => {
        setProperty(records)
    }

    let processResponse = (response) => {

        let obj2 = response.json()
        obj2.then(processData)
    }

    let getData = () => {
        let fetchProperties = fetch("http://localhost:3000/property")
        let fetchSellers = fetch("http://localhost:3000/seller")
        fetchProperties.then(processResponse)
        fetchSellers.then( (response) => response.json().then( (data) => setSellerData(data) ))
    }

    
        // returns full seller object using a filter
        const findSeller=(sellerId) => {
        let seller = sellerData.filter( (seller) => seller.id == sellerId)
        return seller.length == 0 ? "Not Known" : seller[0]
        }
    
        // call buyer info { findBuyer(property.buyerId).firstName }
        // call seller info { findSeller(property.sellerId).firstName }
 
    const filteredProperties = propertyData.filter(property => {
        return (
            (property.status === 'WITHDRAWN') 
        )
    })
 
    useEffect(getData, [])
 
    return (
        <>
            
            <Link className="menu-btn" to="/property-add"> Register a Property </Link> 
            <Link className="menu-btn" to="/property-update"> Update a Property </Link> 
            <Link className="menu-btn" to="/properties"> View Properties for Sale </Link> 
            <br /><br />
        
            <h1 className="center"> Withdrawn Properties </h1> <br />

            
            <br />
            <div className="propGrid">  
            
                {filteredProperties.map(property => (
                    <div className="propCard">
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
                                    <td> <LuFence className="icon-list"/></td>
                                    <td> <h3> {property.garden} </h3> </td>
                                </tr>

                            </table>
                        </section>

                        <h2>This {property.type} property is being sold by: </h2>
                        <h2> {findSeller(property.sellerId).firstName} {findSeller(property.sellerId).surname}  </h2>
                    </ div>
                ))}
            
            </div>
            <br /><br /><br />
    </>
    )
}
 
export default PropertiesWithdrawn