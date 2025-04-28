import { useEffect, useState } from "react"

 const PropertyAdd= () => {
    
    let [sellers, setSellers] = useState([])

    let handleSubmit = async (e) => {
        let property = {
                "address": document.getElementById("address").value,
                "postcode": document.getElementById("postcode").value,
                "type": document.getElementById("type").value,
                "price": document.getElementById("price").value,
                "bedroom": document.getElementById("bedroom").value,
                "bathroom": document.getElementById("bathroom").value,
                "garden": document.getElementById("garden").value,
                "sellerId": document.getElementById("seller").value,
                "status": "FOR SALE"
        }
        let response = await fetch("http://localhost:3000/property", {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(property),
        })
    }

    const getSellers = () => {
        let sellers = fetch("http://localhost:3000/seller")
        sellers.then( (response) => response.json().then( (records) => setSellers(records)))
    }
 
    useEffect(getSellers, [])

    return (
        <div>
        <h1> Register a new property </h1>
        <form >
            <table>
                <tr>
                    <td> Property Address: </td>
                    <td> <input id="address" name="address" type="text" required/> </td>
                </tr>
                <tr>
                    <td> Property Postcode: </td>
                    <td> <input id="postcode" name="postcode" type="text" required/> </td>
                </tr>
                <tr>
                    <td> Property Type: </td>
                    <td><select id="type" name="type" required>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Bungalow">Bungalow</option>
                            <option value="Detatched">Detatched</option>
                        </select> </td>
                </tr>
                <tr>
                    <td> Seller Name: </td>
                    <td><select id="seller" name="seller" required>
                           {
                            sellers.map( (seller) => 
                            <option value={seller.id}> {seller.firstName} {seller.surname} {} </option>
                            )
                           }
                        </select> </td>
                </tr>

                <tr>
                    <td> Asking Price:</td>
                    <td> <input id="price" name="price" type="text" required/> </td>
                </tr>
                <tr>
                    <td> No. of Bedrooms: </td>
                    <td> <input id="bedroom" name="bedroom" type="text" required/> </td>
                </tr>
                <tr>
                    <td> No. of Bathrooms: </td>
                    <td> <input id="bathroom" name="bathroom" type="text" required/> </td>
                </tr>
                <tr>
                    <td> Garden: </td>
                    <td><select id="garden" name="garden" required>
                            <option value="2">No</option>
                            <option value="1">Yes</option>
                        </select> </td>
                </tr>
            </table>
            <button type="button" onClick={handleSubmit}>Add Property</button>
        </form>
        </div>
    )
}
 
export default PropertyAdd;
