import {useState, useEffect} from "react"
import "../form.css"
 
const PropertyAdd= () => {
    let [sellers, setSellers] = useState([])
    let [formData, setFormData] = useState({address: '', postcode: '', type: '', price: '', bedroom: '', bathroom: '', garden: '', sellerId: '', status: ''});
 
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
        setFormData({address: '', postcode: '', type: '', price: '', bedroom: '', bathroom: '', garden: '', sellerId: '', status: ''})
    }
    
    const getSellers = () => {
        let sellers = fetch("http://localhost:3000/seller")
        sellers.then( (response) => response.json().then( (records) => setSellers(records)))
    }
    useEffect(getSellers, [])
 
    return (
        <div>
               <br />
               <h1 className="center"> Register a new property for sale </h1> 
               <h3 className="center"> If you are not registered as a seller, please do that first </h3>
        
        <br/>
        <form onSubmit={handleSubmit}>
            <table className="table-center">
                <h3>
                <tr>
                    <td className="td-right"> Property Address: </td>
                    <td> <input className="select-form" name="address" type="text" value={formData.address} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Property Postcode: </td>
                    <td> <input className="select-form" name="postcode" type="text" value={formData.postcode} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Property Type: </td>
                    <td> <select className="select-form" type="text" name="type" value={formData.type} onChange={handleChange}>
                                <option value=''></option>
                                <option value="Bungalow">Bungalow</option>
                                <option value="House">House</option>
                                <option value="Apartment">Apartment</option>
                                <option value="Studio">Studio</option>
                                <option value="Commercial">Commercial</option>
                        </select>
                    </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Seller Name: </td>
                    <td>
                        <select className="select-form" id="seller" name="sellerId" type="text" value={formData.sellerId} onChange={handleChange}required>
                            <option value=""></option>
                            {sellers.map( (seller) =>
                            <option value={seller.id}> {seller.firstName} {seller.surname} {} </option>
                            )}
                        </select>
                    </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Asking Price: </td>
                    <td> <input className="select-form" name="price" type="text" value={formData.price} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Number of Bedrooms: </td>
                    <td> <input className="select-form" name="bedroom" type="text" value={formData.bedroom} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>    
                </tr>
                <tr>
                    <td className="td-right"> Number of Bathrooms: </td>
                    <td> <input className="select-form" name="bathroom" type="text" value={formData.bathroom} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>      
                </tr>
                <tr>
                    <td className="td-right"> Garden: </td>
                    <td><select className="select-form" id="garden" name="garden" value={formData.garden} onChange={handleChange}  required>
                            <option value=""></option>
                            <option value="2">No</option>
                            <option value="1">Yes</option>
                        </select> </td>
                        <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Status: </td>
                    <td>
                        <select className="select-form" id="status" name="status" value={formData.status} onChange={handleChange} required>
                            <option value=""></option>
                            <option value="FOR SALE">For Sale</option>
                            <option value="SOLD">Sold</option>
                        </select>
                    </td>
                    <td className="ast">*</td>
                </tr>
            </h3></table>
            <br />
            <footer className="center">
                <button className="form-btn" type="submit">Add Property</button>
            </footer>
            
        </form>
        </div>
    )
}
 
export default PropertyAdd;