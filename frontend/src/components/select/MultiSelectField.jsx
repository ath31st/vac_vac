import React from 'react'
import styled from 'styled-components'

const StyledMultiSelect = styled.select`
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`

const MultiSelectField = ({ name, value, onChange, options, placeholder }) => {
  return (
    <StyledMultiSelect name={name} value={value} onChange={onChange} multiple>
      <option value="" disabled>{placeholder}</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </StyledMultiSelect>
  )
}

MultiSelectField.defaultProps = {
  placeholder: 'Select options',
}

export default MultiSelectField
