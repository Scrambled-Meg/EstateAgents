import {useState} from "react"
import "../form.css"
 
const BuyerAdd= () => {
    let [formData, setFormData] = useState({firstName: '', surname: '', address: '', postcode: '', phone: ''});
 
    let handleChange = (e) => {
        let {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'postcode'? value.toUpperCase():value,
        }))
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3000/buyer")
        const existingBuyer = await response.json()
 
        const duplicate = existingBuyer.some((buyer) =>
            buyer.name === formData.name &&
            buyer.surname === formData.surname
        )
 
        if (duplicate){
            alert ('Already registered!')
        }
        else{
            fetch("http://localhost:3000/buyer",{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })
            alert('Weclome to the Doghouse')
        }
    }
 
    return (
        <div>
            <br />
        <h1 className="center">Add New Buyer Details</h1><br />
        <form >
            <table className="table-center">
                <h3>
                <tr>
                    <td className="td-right"> First Name: </td>
                    <td> <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Last Name: </td>
                    <td> <input name="surname" type="text" value={formData.surname} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Address: </td>
                    <td> <input name="address" type="text" value={formData.address} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Postcode: </td>
                    <td> <input name="postcode" type="text" value={formData.postcode} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>
                </tr>
                <tr>
                    <td className="td-right"> Phone: </td>
                    <td> <input name="phone" type="text" value={formData.phone} onChange={handleChange} required/> </td>
                    <td className="ast">*</td>
                </tr>
                </h3>
            </table>
            <br />
            <footer className="center">
                <button className="form-btn" type="button" onClick={handleSubmit}>Add Buyer</button>
    
            </footer>
        </form>
        </div>
    )
}
 
export default BuyerAdd;