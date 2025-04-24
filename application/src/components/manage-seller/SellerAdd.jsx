import {useState} from "react"
 
const SellerAdd= () => {
    let [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        address: '',
        postcode: '',
        phone: ''
    });
 
    let handleChange = (e) => {
        let {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'postcode'? value.toUpperCase():value,
        }))
    }
 
    let handleSubmit = async (e) => {
        let response = await fetch("http://localhost:3000/seller", {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(formData),
        })
    }
 
    return (
        <div>
        <h1>Add New Seller Details</h1>
        <form >
            <table>
                <tr>
                    <td> First Name: </td>
                    <td> <input name="firstName" type="text" value={formData.firstName} onChange={handleChange}/> </td>
                </tr>
                <tr>
                    <td> Last Name: </td>
                    <td> <input name="surname" type="text" value={formData.surname} onChange={handleChange}/> </td>
                </tr>
                <tr>
                    <td> Address: </td>
                    <td> <input name="address" type="text" value={formData.address} onChange={handleChange}/> </td>
                </tr>
                <tr>
                    <td> Postcode: </td>
                    <td> <input name="postcode" type="text" value={formData.postcode} onChange={handleChange}/> </td>
                </tr>
                <tr>
                    <td> Phone: </td>
                    <td> <input name="phone" type="text" value={formData.phone} onChange={handleChange}/> </td>
                </tr>
            </table>
            <button type="button" onClick={handleSubmit}>Add Seller</button>
        </form>
        </div>
    )
}
 
export default SellerAdd;