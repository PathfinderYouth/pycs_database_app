import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FastField } from 'formik';
import { NumberMask } from './NumberMask';
import './FormFields.css';

/**
 * Text field component
 * @param {Object} form Formik object
 * @param {Object} field field object containing the properties of the field
 * @param {function} isFieldDisabled function for determining if this field should be disabled
 */
export const FormTextField = ({ form, field, isFieldDisabled }) => {
  const { values, errors, touched, handleChange, handleBlur } = form;
  const {
    name,
    type,
    label = undefined,
    description = undefined,
    multiline = undefined,
    required = undefined,
    dependsOnOtherField = undefined,
    mask = undefined,
    adornment = undefined,
  } = field;

  // Determine custom inputProps
  const inputProps =
    // if mask and adornment are undefined
    !mask && !adornment
      ? // inputProps = undefined
        undefined
      : // else if mask is defined inputProps = { inputComponent: NumberMask }
      !!mask
      ? {
          inputComponent: NumberMask,
        }
      : // else inputProps = { startAdornment: <InputAdornment/> }
        {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        };

  // Determine custom inputLabelProps
  const inputLabelProps =
    // if type === date
    type === 'date'
      ? // inputLabelProps = { shrink: true }
        {
          shrink: true,
        }
      : // else inputLabelProps = undefined
        undefined;

  // Common props shared between TextFields with and without a FastField wrapper
  const commonProps = {
    label: label,
    type: type,
    required: required,
    variant: 'outlined',
    multiline: multiline,
    error: !!errors[name] && touched[name],
    helperText: !!errors[name] && touched[name] && errors[name],
    InputProps: inputProps,
    InputLabelProps: inputLabelProps,
  };

  // Determines if the field should be disabled and if so, clears its value
  const disabled = isFieldDisabled(field, values);

  // If the field depends on another field, render without a FastField wrapper
  return !!dependsOnOtherField ? (
    <FormControl component="fieldset" fullWidth>
      {!!description && (
        <div className="field-text-descriptionLabel">
          <FormLabel component="legend">{description}</FormLabel>
        </div>
      )}
      <TextField
        {...commonProps}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[name]}
        disabled={disabled}
      />
    </FormControl>
  ) : (
    // If the field does not depend on an other field's value, wrap it in a FastField component to improve form performance
    <FastField name={name} onChange={handleChange} onBlur={handleBlur} value={values[name]}>
      {({ field }) => (
        <FormControl component="fieldset" fullWidth>
          {!!description && (
            <div className="field-text-descriptionLabel">
              <FormLabel component="legend">{description}</FormLabel>
            </div>
          )}
          <TextField {...field} {...commonProps} />
        </FormControl>
      )}
    </FastField>
  );
};
