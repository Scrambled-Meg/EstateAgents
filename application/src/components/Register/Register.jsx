import "./register.css"
import { Link } from "react-router-dom"
import { FaLaptopHouse } from "react-icons/fa";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";

const Register = () => {

    return (
        <>
            <br />
            <h1 className="center"> Join the DogHouse: </h1>
            <br /><br />
            
        

<div className="center">
    <table>
        <tr>
            <td> <GiReceiveMoney className="reg-icon" /> </td>
            <td> <FaLaptopHouse className="reg-icon"/> </td>
            <td> <GiPayMoney className="reg-icon"/> </td>
        </tr>
        <tr>
            
            <td> <Link className="menu-btn" to="/seller-add"> Register as a seller </Link>     </td>
            <td> <Link className="menu-btn" to="/property-add"> Register a Property </Link>  </td>
            <td> <Link className="menu-btn" to="/buyer-add"> Register as a buyer </Link> </td>
        </tr>
    </table>
    
</div>

        
    </>


    )
}

export default Register