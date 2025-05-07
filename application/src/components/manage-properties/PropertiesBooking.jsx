import {useState, useEffect} from "react"
import "../form.css"
 
const PropertyViewBooking = () => {
    const [properties, setProperties] = useState([])
    const[formData, setFormData] = useState({buyerid: '', propid: '', date:'', time:''})
    const [bookings, setBookings] = useState([])
    const [selectedBookingId, setSelectedBookingId] = useState('')
    const [buyers, setBuyers] = useState([])
 
    useEffect(()=>{async function fetchProperties() {
        const response = await fetch("http://localhost:3000/property")
        const data = await response.json()
        setProperties(data)
        }
        fetchProperties()
    }, [])
 
    useEffect(()=>{async function fetchBuyers() {
        const response = await fetch("http://localhost:3000/buyer")
        const data = await response.json()
        setBuyers(data)
        }
        fetchBuyers()
    }, [])
 
    useEffect (() =>{
        fetchBookings()
    }, [])
 
    const fetchBookings = () => {
        fetch("http://localhost:3000/bookings")
            .then((res) => res.json())
            .then((data) => setBookings(data))
    }
    
 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/bookings')
        const existingBookings = await response.json()
 
        const duplicate = existingBookings.some((booking) =>
            booking.propertyId === formData.propertyId &&
            booking.date === formData.date &&
            booking.time === formData.time
        )
 
        if (duplicate){
            alert ('Already Booked! Please choose another time/date')
        }
        else{
            fetch("http://localhost:3000/bookings",{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            alert('Booking Confirmed!')
            setFormData({buyerid: '', propid: '', date:'', time:''})
        }
    }
 
    const handleCancel = async (e) => {
        e.preventDefault()
        if (!selectedBookingId) return
 
        const confirmed = window.confirm('Are you sure you would like to cancel?')
        if (!confirmed) return
 
        const res = await fetch(`http://localhost:3000/bookings/${selectedBookingId}`, {method: 'DELETE'})
        alert('Booking Canceled')
        setSelectedBookingId('')
        fetchBookings()
    }
 
    return (
        <div>
            <br />
            <h1 className="center">Book a Viewing</h1><br />
 
            <form onSubmit={handleSubmit} >
                <table className="table-center">
                    <h3>
 
                    <tr>
                        <td className="td-right">Name (Buyer): </td>
                        <td><select className="input-form" name="buyerid" value={formData.buyerid} onChange={handleChange}>
                                <option value=""></option>
                                    {buyers.map((buyer)=>(
                                    <option key={buyer.id} value={buyer.id}>
                                    {buyer.firstName} {buyer.surname}
                                </option>
                                ))}
                            </select>
                        </td>
                        <td className="ast">*</td>
                    </tr>
                    <tr>
                        <td className="td-right">Property: </td>
                        <td><select className="input-form" name="propid" value={formData.propid} onChange={handleChange}>
                                <option value=""></option>
                                    {properties.map((property)=>(
                                    <option key={property.id} value={property.id}>
                                    {property.address},
                                    {property.postcode}
                                </option>
                                ))}
                            </select>
                        </td>
                        <td className="ast">*</td>
                    </tr>
                    <tr>
                        <td className="td-right">Choose Date: </td>
                        <td><input className="input-form" type="date" name="date" value={formData.date} onChange={handleChange}/></td>
                        <td className="ast">*</td>     
                    </tr>
                    <tr>
                        <td className="td-right" >Choose Time Slot: </td>
                        <td><select className="select-form" name="time" onChange={handleChange} value={formData.time}>
                                <option value=''></option>
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
                        </td>
                        <td className="ast">*</td>
                    </tr>
                    </h3>
                </table>
            
                <br/>
                <footer className="center">
                    <button className="form-btn" type="submit">Request viewing</button>
                </footer>
            </form>
            <br /><br /><br />
            <h2 className="center"> Cancel a booking </h2><br />
            <form onSubmit={(e) => handleCancel(e)}>
                <label className="center">
                    <h3 className="center">Select a booking to cancel:</h3> <br />
                    <select className="select-form2" value={selectedBookingId} onChange={(e) => setSelectedBookingId(e.target.value)} required>
                        <option value=''> Select booking </option>
                        {bookings.map((booking) => {
                            const property = properties.find((p) => p.id === booking.propid)
                            const propertyName = property ? property.address: 'Unknown Property'
                            const buyer = buyers.find((b) => b.id === booking.buyerid)
                            const buyerName = buyer ? buyer.firstName : 'Unknown Buyer'
                            return(
                                <option key={booking.id} value={booking.id}>
                                        {buyerName} - {propertyName} - {booking.date} - {booking.time}
                                </option>
                            )
                        })}
                    </select>
                </label><br />
                <footer className="center">
                    <button className="form-btn" type="submit">Cancel booking</button>
    
                </footer>
                        
            </form>
            <br /><br /><br />
        
        </div>
    )
}
 
export default PropertyViewBooking