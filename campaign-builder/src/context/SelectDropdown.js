import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SelectDropdown.css'; // Optional for custom styling

const SelectDropdown = ({
  label,
  options,
  selected,
  onSelect,
  multiple = false,
  placeholder = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    if (multiple) {
      const newSelection = selected.includes(option)
        ? selected.filter(item => item !== option)
        : [...selected, option];
      onSelect(newSelection);
    } else {
      onSelect(option);
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="select-dropdown-container">
      {label && <label className="select-dropdown-label">{label}</label>}
      
      <div className={`select-dropdown ${isOpen ? 'open' : ''}`}>
        <div className="select-dropdown-header" onClick={toggleDropdown}>
          {multiple ? (
            selected.length > 0 ? (
              <span className="selected-options">
                {selected.join(', ')}
              </span>
            ) : (
              <span className="placeholder">{placeholder}</span>
            )
          ) : (
            <span className="selected-option">
              {selected || placeholder}
            </span>
          )}
          <span className="dropdown-arrow">▼</span>
        </div>
        
        {isOpen && (
          <div className="select-dropdown-options">
            {options.map((option) => (
              <div
                key={option}
                className={`dropdown-option ${
                  (multiple ? selected.includes(option) : selected === option) ? 'selected' : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {multiple && (
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    readOnly
                    className="option-checkbox"
                  />
                )}
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

SelectDropdown.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onSelect: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default SelectDropdown;