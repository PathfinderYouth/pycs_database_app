import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FormCheckBox } from './FormCheckBox';

/**
 * Checklist field component with variable number of FormCheckBox components
 * @param {Object} form Formik object
 * @param {Object} field field object containing the properties of the field
 */
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
