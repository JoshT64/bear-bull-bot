// Dropdown.tsx
import './Dropdown.scss';
import React from 'react';

interface DropdownProps {
  options: React.ReactNode[];
  label?: React.ReactNode;
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  isDropdownOpen,
  toggleDropdown
}) => {
  return (
    <div className="c-dropdown">
      <div onClick={toggleDropdown}>{label}</div>
      {isDropdownOpen && (
        <ul className="c-dropdown-list rounded-md bg-white">
          {options.map((option, index) => (
            <div
              key={index}
              className={`hover:bg-zinc-800 transition ease-in-out ${
                index === 0 ? 'rounded-t' : ''
              } ${index === options.length - 1 ? 'rounded-b' : ''}`}
            >
              {option}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
