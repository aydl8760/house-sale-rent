import React, { useState } from "react";
import { Button } from "../ui/button";

const CheckboxDropdown = ({ name, options, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (id) => {
    const newSelectedValues = selectedValues.includes(id)
      ? selectedValues.filter((value) => value !== id)
      : [...selectedValues, id];

    onChange(newSelectedValues);
  };

  return (
    <div className="relative w-full">
      <Button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full font-normal flex justify-start bg-white hover:bg-white text-gray-500 border border-gray-300 rounded-lg p-6"
      >
        {selectedValues.length > 0
          ? selectedValues.join(", ")
          : `Select ${name}`}
      </Button>

      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 shadow-md rounded-md mt-1">
          {options.map((option) => (
            <label key={option.id} className="flex items-center px-3 py-2">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;
