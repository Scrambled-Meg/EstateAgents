import {useEffect, useState} from "react"
import Bath from "./images/bath"
import Bed from "./images/bed"
import Garden from "./images/Garden"
import House from "./images/house"

const PropertiesList = () => {

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
        let fetchBuyers = fetch("http://localhost:3000/buyer")
        fetchProperties.then(processResponse)
        fetchSellers.then( (response) => response.json().then( (data) => setSellerData(data) ))
        fetchBuyers.then( (response) => response.json().then( (data) => setBuyerData(data) ))

    }

    // returns full buyer object using a filter
    const findBuyer=(buyerId) => {
    let buyer = buyerData.filter( (buyer) => buyer.id == buyerId) 
    return buyer.length == 0 ? "Not Known" : buyer[0]
    }

    // returns full seller object using a filter
    const findSeller=(sellerId) => {
    let seller = sellerData.filter( (seller) => seller.id == sellerId)
    return seller.length == 0 ? "Not Known" : seller[0]
    }

    // call buyer info { findBuyer(property.buyerId).firstName }
    // call seller info { findSeller(property.sellerId).firstName }

    

    useEffect(getData, [])
        return(
            <>
            <br /><br /><br />
            <h1> List of Properties </h1>
        
        <div className="propGrid">  
            {
                propertyData.map ( (property)=>
                
                    <div className="propCard">
        
                    <h1 id="propCardAddress"> {property.address}  </h1> 
                    <h3 id="propCardPostcode"> {property.postcode} </h3>
                    <h2>{property.status} - £{property.price} </h2>   
                    
                    


                    <House />

                    <section>

                        <table class="tableCard">
                            <tr>
                                <td> <Bed /> </td>
                                <td> <h3> {property.bedroom} </h3> </td>
                                <td> <Bath /> </td>
                                <td> <h3> {property.bathroom} </h3> </td>
                                <td> <Garden /> </td>
                                <td> <h3> {property.garden} </h3> </td>
                            </tr>

                        </table>
                    </section>

                    <h2>This {property.type} property is being sold by: </h2>
                    <h2> {findSeller(property.sellerId).firstName} {findSeller(property.sellerId).surname}  </h2>

                </ div>
            
                
)     
            }
            </div>
            </>
        )

}

export default PropertiesList