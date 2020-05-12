import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export const FormRadioGroup = ({ form, field, isFieldDisabled }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur
  } = form;
  const {
    name,
    options,
    label = undefined,
    required = undefined,
    dependsOnOtherField = undefined,
  } = field;

  const disabled = isFieldDisabled(dependsOnOtherField, values, name);

  return (
    <FormControl
      component="fieldset"
      error={!!errors[name] && touched[name]}
      required={required}
    >
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={name}
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        row
      >
        {options.map((option) => (
          <FormControlLabel
            key={`${name}-${option}`}
            value={option}
            control={<Radio />}
            label={option}
            disabled={disabled}
          />
        ))}
      </RadioGroup>
      {!!errors[name] && touched[name] && (
        <FormHelperText>{errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};
