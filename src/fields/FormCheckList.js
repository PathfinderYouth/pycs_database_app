import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FormCheckBox } from './FormCheckBox';

export const FormCheckList = ({ form, field }) => {
  const { errors, touched } = form;
  const { name, options, label = undefined, required = undefined } = field;
  return (
    <FormControl component="fieldset" error={!!errors[name] && touched[name]} required={required}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <FormCheckBox key={`${name}-${option}`} form={form} field={field} value={option} />
        ))}
      </FormGroup>
      {!!errors[name] && touched[name] && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};
