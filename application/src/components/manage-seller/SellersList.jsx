import {useState, useEffect} from "react"

import { IoPersonCircleOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
 
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
        <><br />

        <h1 className="center">List of Sellers</h1>
        
        {
            sellersData.map((seller)=>
            <div className="card">  
        
                    <br />
                    <IoPersonCircleOutline className="person-icon" />
                    <h2> {seller.firstName} {seller.surname} </h2>
                    <h3> {seller.address}, {seller.postcode} </h3>
                    { seller.phone == "" ? <h3> No contact number provided</h3> : <h3><FaPhoneAlt /> {seller.phone}</h3>  }
                    <br />

            </div>
        )}
 
        </>
    )
}

export default SellersList