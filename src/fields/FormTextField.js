import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FastField } from 'formik';
import { NumberMask } from './NumberMask';
import './FormFields.css';

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

  const inputProps =
    !mask && !adornment
      ? undefined
      : !!mask
      ? {
          inputComponent: NumberMask,
        }
      : {
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        };

  const inputLabelProps =
    type === 'date'
      ? {
          shrink: true,
        }
      : undefined;

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

  const disabled = isFieldDisabled(field, values, name);

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
