import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

export const FormRadioGroup = ({ form, field }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
  } = form;
  const {
    name,
    options,
    label = undefined,
    required = undefined,
    dependantFields = undefined,
    dependsOnOtherField = undefined,
  } = field;

  const disabled =
    !!dependsOnOtherField &&
    values[dependsOnOtherField.name] !== dependsOnOtherField.value;

  const handleDependantFieldChange = ({ target: { value } }) => {
    if (!!dependantFields) {
      dependantFields.forEach((field) => {
        if (value !== field.value) {
          setFieldValue(field.name, '');
        }
      });
    }
  };

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
        onChange={(event) => {
          handleChange(event);
          handleDependantFieldChange(event);
        }}
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
