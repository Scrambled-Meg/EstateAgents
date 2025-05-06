import {useState, useEffect} from "react"
import "../form.css"

const PropertyUpdate = ()=>{
    const [properties, setProperties] = useState([]);
    const [selectedPropertyid, setselectedPropertyid] = useState("");
    const [propertyDetails, setPropertyDetails] = useState({address: '', postcode: '', type: '', price: '', bedroom: '', bathroom: '', garden: '', sellerId: '', status: '', buyerId: '',})
 
    useEffect(()=>{async function fetchProperties() {
        const response = await fetch("http://localhost:3000/property")
        const data = await response.json()
        setProperties(data)
        }
        fetchProperties()
    }, [])
 
    useEffect(() => {async function fetchPropertyDetails() {
        if (!selectedPropertyid) return;
            const response = await fetch(`http://localhost:3000/property/${selectedPropertyid}`)
            const data = await response.json();
            setPropertyDetails({
                address: data.address ||"",
                postcode: data.postcode ||"",
                type: data.type ||"",
                price: data.price ||"",
                bedroom: data.bedroom ||"",
                bathroom: data.bathroom ||"",
                garden: data.garden ||"",
                sellerId: data.sellerId ||"",
                status: data.status ||"",
                buyerId: data.buyerId ||"",
            })
    }
    fetchPropertyDetails()},[selectedPropertyid])
 
    const handleChange = (e) => {
        const {name, value} = e.target
        setPropertyDetails((prevDetails)=> ({
            ...prevDetails,
            [name]:value
        }))
    }
 
    const handleSave = async () => {
        await fetch(`http://localhost:3000/property/${selectedPropertyid}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(propertyDetails),
        })
        alert("Property updated!")
        setFormData({address: '', postcode: '', type: '', price: '', bedroom: '', bathroom: '', garden: '', sellerId: '', status: '', buyerId: '',})
    }
 
    return (
        <>
            <br />
            <h1 className="center"> Update Property Details</h1>

            <div  className="filter-bar">
                <select className="form-btn" value={selectedPropertyid} onChange={e => setselectedPropertyid(e.target.value)} >
                    <option value="">Select a Property</option>
                        {properties.map((property)=>(
                            <option key={property.id} value={property.id}>
                                {property.address},
                                {property.postcode}
                            </option>
                        ))}
            </select></div><br />
            
        {selectedPropertyid && (
        <form onSubmit={handleSave}>

        <table className="table-center">
            <h3>
            <tr>
                <td className="td-right"> New Address:  </td>
                <td> <input className="select-form" type="text" name="address" value={propertyDetails.address} onChange={handleChange} required/> </td>
                <td className="ast">*</td>
            </tr>
            <tr>
                <td className="td-right"> New Postcode: </td>
                <td> <input className="select-form" type="text" name="postcode" value={propertyDetails.postcode} onChange={handleChange} required/> </td>
                <td className="ast">*</td>
            </tr>
            <tr>
                    <td className="td-right"> New Property Type: </td>
                    <td> <select className="select-form" type="text" name="type" value={propertyDetails.type} onChange={handleChange} required>
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
                <td className="td-right"> New Price: </td>
                <td> <input className="select-form" type="text" name="price" value={propertyDetails.price} onChange={handleChange}required /> </td>
                <td className="ast">*</td>
            </tr>
            <tr>
                <td className="td-right"> New Bedrooms: </td>
                <td>  <input className="select-form" type="text" name="bedroom" value={propertyDetails.bedroom} onChange={handleChange} required/> </td>
                <td className="ast">*</td>
            </tr>
            <tr>
                <td className="td-right"> New Bathrooms: </td>
                <td> <input className="select-form" type="text" name="bathroom" value={propertyDetails.bathroom} onChange={handleChange}required /> </td>
                <td className="ast">*</td>
            </tr>
            <tr>
                    <td className="td-right"> New Garden: </td>
                    <td><select className="select-form" id="garden" name="garden" value={propertyDetails.garden} onChange={handleChange}  required>
                            <option value=""></option>
                            <option value="2">No</option>
                            <option value="1">Yes</option>
                        </select> </td>
                        <td className="ast">*</td>
                </tr>
            <tr>
                <td className="td-right"> New Seller ID:  </td>
                <td> <input className="select-form" type="text" name="sellerId" value={propertyDetails.sellerId} onChange={handleChange} required/> </td>
                <td className="ast">*</td>
            </tr>
            <tr>
                    <td className="td-right"> New Status: </td>
                    <td>
                        <select className="select-form" id="status" name="status" value={propertyDetails.status} onChange={handleChange} required>
                            <option value=""></option>
                            <option value="FOR SALE">For Sale</option>
                            <option value="SOLD">Sold</option>
                            <option value="WITHDRAWN">Withdrawn</option>
                        </select>
                    </td>
                    <td className="ast">*</td>
                </tr>
            <tr>
                <td className="td-right"> New Buyer ID: </td>
                <td> <input className="select-form" type="text" name="buyerId" value={propertyDetails.buyerId} onChange={handleChange}/> </td>
            </tr>
            </h3>
        </table>
        <br />
        <footer className="center">
            <button className="form-btn" type="submit">Update Property</button>
        </footer>
        </form>
        )}
        </>
    )
}
 
export default PropertyUpdate;