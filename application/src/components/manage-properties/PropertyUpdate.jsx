import {useState, useEffect} from "react"
 
const PropertyUpdate = ()=>{
    const [properties, setProperties] = useState([]);
    const [selectedPropertyid, setselectedPropertyid] = useState("");
    const [propertyDetails, setPropertyDetails] = useState({
        address: '',
        postcode: '',
        type: '',
        price: '',
        bedroom: '',
        bathroom: '',
        garden: '',
        sellerId: '',
        status: '',
        buyerId: '',
    })
 
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
    }
 
    return (
        <div>
        <h1>Update Property Details</h1>
        <select value={selectedPropertyid} onChange={e => setselectedPropertyid(e.target.value)} >
            <option value="">Select a Property</option>
            {properties.map((property)=>(
                <option key={property.id} value={property.id}>
                    {property.address},
                    {property.postcode}
                </option>
            ))}
        </select>
 
        {selectedPropertyid && (
        <form>
            New Address: <input type="text" name="address" value={propertyDetails.address} onChange={handleChange}/>
            <br/>
            New Postcode: <input type="text" name="postcode" value={propertyDetails.postcode} onChange={handleChange}/>
            <br/>
            New Type: <input type="text" name="type" value={propertyDetails.type} onChange={handleChange}/>
            <br/>
            New Price: <input type="text" name="price" value={propertyDetails.price} onChange={handleChange}/>
            <br/>
            New Bedrooms: <input type="text" name="bedroom" value={propertyDetails.bedroom} onChange={handleChange}/>
            <br/>
            New Bathrooms: <input type="text" name="bathroom" value={propertyDetails.bathroom} onChange={handleChange}/>
            <br/>
            New Garden: <input type="text" name="garden" value={propertyDetails.garden} onChange={handleChange}/>
            <br/>
            New Seller ID: <input type="text" name="sellerId" value={propertyDetails.sellerId} onChange={handleChange}/>
            <br/>
            New Status: <input type="text" name="status" value={propertyDetails.status} onChange={handleChange}/>
            <br/>
            New Buyer ID: <input type="text" name="buyerId" value={propertyDetails.buyerId} onChange={handleChange}/>
            <br/>
            <button onClick={handleSave}>Save</button>
        </form>
        )}
        </div>
    )
}
 
export default PropertyUpdate;