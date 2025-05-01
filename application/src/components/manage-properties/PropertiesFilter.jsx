import { useEffect, useState } from "react"
import House from "./images/house"
import Bath from "./images/bath"
import Bed from "./images/bed"
import Garden from "./images/Garden"
import "./properties.css"

 
const PropertyFilter = () => {
    const [properties, setproperties] = useState([])
    const [filters, setFilters] = useState({type: '', bathroom: ''})
 
    useEffect (() =>{
        fetch("http://localhost:3000/property")
        .then((res) => res.json())
        .then((data) => {
            setproperties(data)
        })
    }, [])
 
    const handleChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value})
    }
 
    const resetFilters = () => {
        setFilters({type: '', bathroom: ''})
    }
 
    const filteredProperties = properties.filter(property => {
        return (
            (filters.type === '' || property.type === filters.type) &&
            (filters.bathroom === '' || property.bathroom === filters.bathroom)
        )
    })
 
    return (
        <>
            <h2>Filtered Properties</h2>
            <div style={{marginBotton:'1rem'}}>
                <select name='type' onChange={handleChange} value={filters.type}>
                    <option value="">All types</option>
                    <option value="APARTMENT">APARTMENT</option>
                    <option value="DETACHED">DETACHED</option>
                </select>
                <select name='bathroom' onChange={handleChange} value={filters.bathroom}>
                    <option value="">How Many Bathrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <button onClick={resetFilters}>Reset Filters</button>

            
            <br /><br /><br />

            <h1 className="center"> List of Properties </h1> <br /><br />
        
        <div className="propGrid">  
            
            {filteredProperties.map(property => (
                <div className="propCard">
        
                <h1 id="propCardAddress"> {property.address}  </h1> 
                <h3 id="propCardPostcode"> {property.postcode} </h3>
                <h2>{property.status} - £{property.price} </h2>   
                
                


                <House />

                <section>

                    <table class="tableCard">
                        <tr>
                            <td> <Bed className="icon"/> </td>
                            <td> <h3> {property.bedroom} </h3> </td>
                            <td> <Bath /> </td>
                            <td> <h3> {property.bathroom} </h3> </td>
                            <td> <Garden /> </td>
                            <td> <h3> {property.garden} </h3> </td>
                        </tr>

                    </table>
                </section>

                <h2>This {property.type} property is being sold by: </h2>
                {/* <h2> {findSeller(property.sellerId).firstName} {findSeller(property.sellerId).surname}  </h2> */}

            </ div>


            )  
            )     
            }
            
        </div>
           
    </>
    )
}
 
export default PropertyFilter