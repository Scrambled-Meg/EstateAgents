import {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import SellerIcon from "./Icons/SellerIcon"
 
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
        
        
        {
            sellersData.map((seller)=>
            <div className="card">  
                    <SellerIcon />
                    <h1> {seller.firstName} {seller.surname} </h1>
                    <h2> {seller.address}, {seller.postcode} </h2>
                    <h2> Contact: {seller.phone}</h2>
                    
            </div>
        )}
 
        </>
    )
}

export default SellersList