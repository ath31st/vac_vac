import React from 'react';
import styled from 'styled-components';
import { Option as CustomOption } from '../../types';

const StyledSelect = styled.select`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

interface SelectFieldProps {
  id?: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: CustomOption[];
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
}) => {
  const selectId = id || name;

  return (
    <StyledSelect id={selectId} name={name} value={value} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default SelectField;
