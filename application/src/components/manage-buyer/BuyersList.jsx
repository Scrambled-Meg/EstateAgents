import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
 
 
const Buyers=()=>{
   
    let [buyersData,setBuyers] = useState([])
 
    let processData=(records)=>{
        setBuyers(records)
    }
 
    let processResponse=(response)=>{
        let obj2=response.json()
        obj2.then(processData)
    }
 
    let getData=()=>{
        let fetchObject = fetch("http://localhost:3000/buyer")
        fetchObject.then(processResponse)
 
    }
 
    useEffect(getData,[])
 
    return(
         <>
         <h1>List of Buyers</h1>
         <table>
            <tr>
              <td>First Name</td>
              <td>Surname</td>
              <td>Address</td>
              <td>Postcode</td>
              <td>Phone</td>
      
            </tr>
         {
            buyersData.map( (buyer)=>
                <tr>
                    <td>{buyer.firstName}</td>
                    <td>{buyer.surname}</td>
                    <td>{buyer.address}</td>
                    <td>{buyer.postcode}</td>
                    <td>{buyer.phone}</td>
                </tr>
 
            )
         }
         </table>
         </>
 
    )
 
}
 
export default Buyers