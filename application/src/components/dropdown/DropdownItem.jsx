import "./Dropdown.css";

import {BrowserRouter, Link, Router, Route, Routes} from "react-router-dom"
import PropertiesList from "../manage-properties/PropertiesList";

const DropdownItem = ({ children, onClick }) => {
  return (
    <div className="dropdown-item">
      {children}
    </div>
  );
};

export default DropdownItem;