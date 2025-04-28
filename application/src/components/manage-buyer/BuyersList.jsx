import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import BuyerIcon from "./Icons/BuyerIcon"
 
 
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
        <h2>List of Sellers</h2>

        {
            buyersData.map((buyer)=>
            <div className="card">  
                    <BuyerIcon />
                    <h1> {buyer.firstName} {buyer.surname} </h1>
                    <h2> {buyer.address}, {buyer.postcode} </h2>
                    <h2> Contact: {buyer.phone}</h2>
                    
            </div>
        )}

</>
 
    )
 
}
 
export default Buyers