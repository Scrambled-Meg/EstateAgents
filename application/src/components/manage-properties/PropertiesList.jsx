
import {useEffect, useState} from "react"

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




    
    

    useEffect(getData, [])
        return(
            <>
            <h1> List of Properties </h1>
        

            {
                propertyData.map ( (property)=>

                <>
                <section>    
                    <table class="center">
                        <tr>
                            <td colspan="3"> {property.address}, {property.postcode}
                                seller{
                                    
                                    findSeller(property.sellerId).firstName
                                }

                                buyer {

                                    findBuyer(property.buyerId).firstName
                        

                                }
                                </td>
                        </tr>
                        <tr>
                            <td> £{property.price} </td>
                            <td> {property.type} </td>
                            <td> {property.status} </td>
                        </tr>
                    </table>
                    <p> INSERT IMAGE HERE </p>
                    <br />
                    <table class="center">
                        <tr>
                            <td>Beds:</td>
                            <td>Bathrooms:</td>
                            <td>Garden:</td>
                        </tr>
                        <tr>
                            <td> {property.bedroom} </td>
                            <td> {property.bathroom} </td>
                            <td> {property.garden} </td>
                        </tr>
                    </table>
                </section> 
                <br />
                <br />
                </>

                
                
                
)     
            }
            </>
        )

}

export default PropertiesList