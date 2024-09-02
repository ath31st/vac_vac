import { MultiSelect } from 'react-multi-select-component';
import React from 'react';

const MultiSelectField = ({ name, value, onChange, options, placeholder }) => {
  const handleChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map(option => option.value);
    onChange({ target: { name, value: selectedIds } });
  };

  return (
    <div>
      <MultiSelect
        className="multi-select"
        options={options}
        value={options.filter(option => value.includes(option.value))}
        onChange={handleChange}
        labelledBy={placeholder || 'Select'}
      />
    </div>
  );
};

export default MultiSelectField;
