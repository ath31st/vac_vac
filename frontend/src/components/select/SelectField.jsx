import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const SelectField = ({ name, value, onChange, options, placeholder }) => {
  return (
    <StyledSelect name={name} value={value} onChange={onChange}>
      <option value="" disabled>{placeholder}</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  )
}

export default SelectField
