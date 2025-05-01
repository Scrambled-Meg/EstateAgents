import { useEffect, useState } from "react"
 
const PropertyFilter = () => {
    const [properties, setproperties] = useState([])
    const [filters, setFilters] = useState({type: '', bathroom: ''})
 
    useEffect (() =>{
        fetch("http://localhost:3000/property")
        .then((res) => res.json())
        .then((data) => {
            setproperties(data)
        })
    }, [])
 
    const handleChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value})
    }
 
    const resetFilters = () => {
        setFilters({type: '', bathroom: ''})
    }
 
    const filteredProperties = properties.filter(property => {
        return (
            (filters.type === '' || property.type === filters.type) &&
            (filters.bathroom === '' || property.bathroom === filters.bathroom)
        )
    })
 
    return (
        <div>
            <h2>Filtered Properties</h2>
        
            <div style={{marginBotton:'1rem'}}>
                <select name='type' onChange={handleChange} value={filters.type}>
                    <option value="">All types</option>
                    <option value="APARTMENT">APARTMENT</option>
                    <option value="DETACHED">DETACHED</option>
                </select>
                <select name='bathroom' onChange={handleChange} value={filters.bathroom}>
                    <option value="">How Many Bathrooms</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <button onClick={resetFilters}>Reset Filters</button>
            <ul>
                {filteredProperties.map(property => (
                    <li key={property.id}>
                        {property.address} - {property.type} - {property.bathroom}
                    </li>
                ))}
            </ul>
        </div>
    )
}
 
export default PropertyFilter