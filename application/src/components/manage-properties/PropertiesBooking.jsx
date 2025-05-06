import {useState, useEffect} from "react"
 
const PropertyViewBooking = () => {
    const [properties, setProperties] = useState([])
    const[formData, setFormData] = useState({firstname: '',surname:'', address:'', postcode:'', phone: '', propid: '', date:'', time:''})
 
    useEffect(()=>{async function fetchProperties() {
        const response = await fetch("http://localhost:3000/property")
        const data = await response.json()
        setProperties(data)
        }
        fetchProperties()
    }, [])
 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
 
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("http://localhost:3000/bookings",{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then(() => alert('Booking Confirmed!'))
    }
 
    return (
        <div>
            <h2>Book a Viewing</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name: <input type="text" name="firstname" value={formData.firstName} onChange={handleChange} required/>
                </label>
                <br/>
                <label>
                    Last Name: <input type="text" name="surname" value={formData.surname} onChange={handleChange} required/>
                </label>
                <br/>
                <label>
                    Current Address: <input type="text" name="address" value={formData.address} onChange={handleChange}required/>
                </label>
                <br/>
                <label>
                    Current Postcode: <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} required/>
                </label>
                <br/>
                <label>
                    Phone Number: <input type="text" name="phone" value={formData.phone} onChange={handleChange} required/>
                </label>
                <br/>
                <label>
                    
                    Property: <select name="propid" value={formData.propid} onChange={handleChange}>
                        <option value="">Select Property</option>
                        {properties.map((property)=>(
                        <option key={property.id} value={property.id}>
                            {property.address},
                            {property.postcode}
                            </option>
                            ))}
                    </select>
                </label>
                <br/>
                <label>
                    Choose Date: <input type="date" name="date" value={formData.date} onChange={handleChange}/>
                </label>
                <br/>
                Choose Time Slot: <select className="time" name='time' onChange={handleChange} value={formData.time}>
                    <option value=''>Time Slot</option>
                    <option value="8am-9am">8am-9am</option>
                    <option value="9am-10am">9am-10am</option>
                    <option value="10am-11am">10am-11am</option>
                    <option value="11am-12pm">11am-12pm</option>
                    <option value="12pm-1pm">12pm-1pm</option>
                    <option value="1pm-2pm">1pm-2pm</option>
                    <option value="2pm-3pm">2pm-3pm</option>
                    <option value="3pm-4pm">3pm-4pm</option>
                    <option value="4pm-5pm">4pm-5pm</option>
                </select>
                <br/>
                <button type="submit">Book</button>
            </form>
        </div>
    )
}
 
export default PropertyViewBooking