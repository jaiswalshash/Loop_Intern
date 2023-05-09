import React, { useState } from "react";
import arrow from "./arrow.png";

import "./dropdown.css"
const Dropdown = ({ options , selectedVin, open}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    console.log(option);
    setSelectedOption(option);
    console.log(selectedOption);
    
    setIsOpen(false);
    selectedVin(option);
    open(false);
  };

  const handleHeaderClick = () => {
    open(!isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <div className="ind-dropdown-container">
      <div className="dropdown-header" onClick={handleHeaderClick}>
        {/* <div className="dropdown-title">{selectedOption || "SELECT VIN"}</div>
        <img className='arrow-img' width={15} src={arrow} alt = ""/> */}
      </div>
      {true && (
        <ul className="ind-dropdown-menu">
          {options.map((option) => (
            <li className={`dropdown-option ${
              option === selectedOption ? "selected" : ""
            }`}  onClick={() => handleOptionClick(option.fields.Name)}>
              {option.fields.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
