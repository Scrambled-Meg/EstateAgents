import { useState, useEffect } from "react"
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

 
 
const BuyersList=()=>{
   
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
        <br />
        <h1 className="center"> Our Buyers</h1>

        {
            buyersData.map((buyer)=>
            <div className="card"> 
                    <br />
                    <IoPersonCircleOutline className="person-icon" />
                    <h2> {buyer.firstName} {buyer.surname} </h2>
                    <h3> {buyer.address}, {buyer.postcode} </h3>
                    { buyer.phone == "" ? <h3> No contact number provided</h3> : <h3><FaPhoneAlt /> {buyer.phone}</h3>  }
                    <br />
                       
                         
                    
            </div>
        )}

</>
 
    )
 
}
 
export default BuyersList