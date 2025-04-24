import Menu from './components/Menu'


import './App.css'
import { BrowserRouter } from 'react-router-dom'
import PropertyAdd from './components/manage-properties/PropertyAdd'
import BuyerAdd from './components/manage-buyer/BuyerAdd'

function App() {

  return (
    <>
     <h1> Team A's Estate Agents </h1>
     

      <Menu/>
      <BuyerAdd />
      <PropertyAdd />
      
     
      
    </>
  )
}

export default App
