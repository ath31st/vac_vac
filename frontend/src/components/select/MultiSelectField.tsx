import React from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { Option as CustomOption } from '../../types';

interface MultiSelectFieldProps {
  name: string;
  value: string[];
  onChange: (event: { target: { name: string; value: string[] } }) => void;
  options: CustomOption[];
  placeholder?: string;
}

const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  name,
  value,
  onChange,
  options,
  placeholder,
}) => {
  const handleChange = (selectedOptions: CustomOption[]) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    onChange({
      target: { name, value: selectedValues },
    });
  };

  return (
    <div>
      <MultiSelect
        className="multi-select"
        options={options.map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        value={options.filter((option) => value.includes(option.value))}
        onChange={handleChange}
        labelledBy={placeholder || 'Select'}
      />
    </div>
  );
};

export default MultiSelectField;
