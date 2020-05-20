import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

/**
 * Dropdown select field component
 * @param {Object} form Formik object
 * @param {Object} field field object containing the properties of the field
 */
export const FormSelect = ({ form, field }) => {
  const { values, errors, touched, handleChange, handleBlur } = form;
  const { name, label, options, required = undefined } = field;

  return (
    <FormControl component="fieldset" fullWidth>
      <TextField
        name={name}
        label={label}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        variant="outlined"
        required={required}
        error={!!errors[name] && touched[name]}
        helperText={!!errors[name] && touched[name] && errors[name]}
        select
      >
        {options.map((option) => (
          <MenuItem key={`${name}-${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );
};
