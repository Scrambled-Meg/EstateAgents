import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
 
const SellersList=()=>{
    let [sellersData,setSellers] = useState([])
    let processData=(records)=>{
        setSellers(records)
    }
    let processResponse=(response)=>{
 
        let obj2=response.json()
        obj2.then(processData)
    }
    let getData=()=>{
        let fetchObject= fetch("http://localhost:3000/seller")
        fetchObject.then(processResponse)
    }
    
    useEffect(getData,[])
    
    return(
        <>
        <h2>List of Sellers</h2>
        
        
            <table border = "1">
            <th>First Name</th>
            <th>Surname</th>
            <th>Address</th>
            <th>Post Code</th>
            <th>Phone</th>
            <th>Seller ID</th>
               
                {
                
                sellersData.map((seller)=>
                    <tr>
                    <td>
                        {seller.firstName}
                    </td>
                    <td>
                        {seller.surname}
                    </td>
                    <td>
                        {seller.address}
                    </td>
                    <td>
                        {seller.postcode}
                    </td>
                    <td>
                        {seller.phone}
                    </td>
                    <td>
                        {seller.id}
                    </td>
                    {/* <td><Link to={`/properties/${seller.id}`}> Properties </Link></td> */}
                    </tr>
           
           
        )}
        </table>
        
        </>
 
 
    )
}

export default SellersList