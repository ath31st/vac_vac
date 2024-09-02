import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const SelectField = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder
}: any) => {
  const selectId = id || name;

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <StyledSelect id={selectId} name={name} value={value} onChange={onChange}>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <option value="" disabled>{placeholder}</option>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      {options.map((option: any) => <option key={option.id} value={option.id}>
        {option.name}
      </option>)}
    </StyledSelect>
  );
};

export default SelectField;
