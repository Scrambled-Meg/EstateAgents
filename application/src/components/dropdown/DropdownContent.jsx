import { forwardRef } from "react";

import "./Dropdown.css";

const DropdownContent = ({children, open}) => {

    return (
    <div
      className={`dropdown-content ${open ? "content-open" : null}`}
    >
      {children}
    </div>
  );
}

export default DropdownContent;