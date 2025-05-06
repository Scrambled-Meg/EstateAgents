import {useState, useEffect} from "react"
import "../form.css"
 
const PropertyAdd= () => {
    let [sellers, setSellers] = useState([])
    let [formData, setFormData] = useState({address: '', postcode: '', type: '', price: '', bedroom: '', bathroom: '', garden: '', sellerId: '', status: 'FOR SALE'});
 
    let handleChange = (e) => {
        let {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'postcode'? value.toUpperCase():value,
        }))
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/property")
        const existingProperty = await response.json()
 
        const duplicate = existingProperty.some((property) =>
            property.address === formData.address &&
            property.postcode === formData.postcode
        )
 
        if (duplicate){
            alert ('Already registered!')
        }
        else{
            fetch("http://localhost:3000/property",{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            alert('Property added for sale!')
        }
    }
    
    const getSellers = () => {
        let sellers = fetch("http://localhost:3000/seller")
        sellers.then( (response) => response.json().then( (records) => setSellers(records)))
    }
    useEffect(getSellers, [])
 
    return (
        <div>
        <h1>Register a new property for sale</h1>
        <h3>If you are not registered as a seller, please do that first</h3>
        <br/>
        <form >
            <table>
                <tr>
                    <td> Property Address: </td>
                    <td> <input name="address" type="text" value={formData.address} onChange={handleChange}/> </td>
                </tr>
                <tr>
                    <td> Property Postcode: </td>
                    <td> <input name="postcode" type="text" value={formData.postcode} onChange={handleChange}/> </td>
                </tr>
                <tr>
                    <td> Property Type: </td>
                    <td> <input name="type" type="text" value={formData.type} onChange={handleChange}/> </td>
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
                    <td> Asking Price: </td>
                    <td> <input name="price" type="text" value={formData.price} onChange={handleChange}/> </td>
                </tr>
                <tr>
                    <td> Number of Bedrooms: </td>
                    <td> <input name="bedroom" type="text" value={formData.bedroom} onChange={handleChange}/> </td>
                </tr>
                <tr>
                    <td> Number of Bathrooms: </td>
                    <td> <input name="bathroom" type="text" value={formData.bathroom} onChange={handleChange}/> </td>
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