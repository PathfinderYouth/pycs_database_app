import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export const FormCheckBox = ({ form, field, value }) => {
  const { values, handleChange, handleBlur } = form;
  const { name, maxChecked = undefined } = field;
  const isChecked = values[name].includes(value);
  return (
    <FormControlLabel
      label={value}
      control={
        <Checkbox
          onChange={handleChange}
          onBlur={handleBlur}
          checked={isChecked}
          value={value}
          name={name}
          disabled={
            maxChecked &&
            values[name].length >= maxChecked &&
            !isChecked
          }
        />
      }
    />
  );
};
