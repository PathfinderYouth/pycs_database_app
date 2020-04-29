import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const FormCheckBox = ({
  values,
  handleChange,
  fieldName,
  fieldValue,
  maxChecked = null,
}) => {
  const isChecked = values[fieldName].includes(fieldValue);
  return (
    <FormControlLabel
      control={
        <Checkbox
          onChange={handleChange}
          checked={isChecked}
          value={fieldValue}
          name={fieldName}
          disabled={
            maxChecked &&
            values[fieldName].length >= maxChecked &&
            !isChecked
          }
        />
      }
      label={fieldValue}
    />
  );
};
