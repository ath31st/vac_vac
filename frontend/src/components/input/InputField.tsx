import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const InputField = ({ id, type, name, placeholder, value, onChange }) => {
  const inputId = id || name;

  return (
    <StyledInput
      id={inputId}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
