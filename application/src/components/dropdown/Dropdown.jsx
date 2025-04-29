import { useState, useRef, useEffect } from "react";

import DropdownButton from "./DropdownButton";
import DropdownContent from "./DropdownContent";

import "./Dropdown.css";


const Dropdown = ({ buttonText, content }) => {

  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen((open) => !open)
  }

  const dropdownRef = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} className="dropdown">
      <DropdownButton toggle={toggleDropdown} open={open}>
        {buttonText}
      </DropdownButton>
      {
        <DropdownContent open={open}>
          {content}
        </DropdownContent>
      }
    </div>
  );
};

export default Dropdown;