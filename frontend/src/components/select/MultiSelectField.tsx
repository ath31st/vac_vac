import { MultiSelect } from 'react-multi-select-component';
import React from 'react';

const MultiSelectField = ({
  name,
  value,
  onChange,
  options,
  placeholder
}: any) => {
  const handleChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions.map((option: any) => option.value);
    onChange({ target: { name, value: selectedIds } });
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div>
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <MultiSelect
        className="multi-select"
        options={options}
        value={options.filter((option: any) => value.includes(option.value))}
        onChange={handleChange}
        labelledBy={placeholder || 'Select'}
      />
    </div>
  );
};

export default MultiSelectField;
