import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

/**
 * Checkbox field component which is controlled by a FormCheckList component
 * @param {Object} form Formik object
 * @param {Object} field field object containing the properties of the field
 * @param {value} string value of this checkbox
 */
export const FormCheckBox = ({ form, field, value }) => {
  const { values, handleChange, handleBlur } = form;
  const { name, maxChecked = undefined } = field;
  const isChecked = values[name].includes(value);
  const disabled = maxChecked && values[name].length >= maxChecked && !isChecked;

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
          disabled={disabled}
        />
      }
    />
  );
};
