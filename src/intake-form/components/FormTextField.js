import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FastField } from 'formik';
import { NumberMask } from './NumberMask';
import './FormSteps.css';

export const FormTextField = ({ form, field }) => {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = form;
  const {
    name,
    type,
    label = undefined,
    description = undefined,
    multiline = undefined,
    required = undefined,
    dependantFields = undefined,
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
          startAdornment: (
            <InputAdornment position="start">$</InputAdornment>
          ),
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

  const isFieldDisabled = (dependsOnOtherField, values) => {
    const { name, list, value } = dependsOnOtherField;
    return list ? !values[name].includes(value) : values[name] !== value
  }

  const handleDependantFieldChange = ({ target: { value } }) => {
    if (!!dependantFields) {
      dependantFields.forEach((field) => {
        if (value !== field.value) {
          setFieldValue(field.name, '');
        }
      });
    }
  };

  return !!dependsOnOtherField ? (
    <FormControl component="fieldset" fullWidth>
      {!!description && (
        <FormLabel component="legend">{description}</FormLabel>
      )}
      <TextField
        {...commonProps}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={isFieldDisabled(dependsOnOtherField, values) ? '' : values[name]}
        disabled={isFieldDisabled(dependsOnOtherField, values)}
      />
    </FormControl>
  ) : (
    <FastField
      name={name}
      onChange={(event) => {
        handleChange(event)
        handleDependantFieldChange(event)
      }}
      onBlur={handleBlur}
      value={values[name]}
    >
      {({ field }) => (
        <FormControl component="fieldset" fullWidth>
          {!!description && (
            <FormLabel component="legend">{description}</FormLabel>
          )}
          <TextField {...field} {...commonProps} />
        </FormControl>
      )}
    </FastField>
  );
};
