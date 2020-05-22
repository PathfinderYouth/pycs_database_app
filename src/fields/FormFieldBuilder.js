import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormTextField } from './FormTextField';
import { FormRadioGroup } from './FormRadioGroup';
import { FormCheckList } from './FormCheckList';
import { FormSelect } from './FormSelect';

/**
 * Determines if a field should be disabled if the if has another field that it depends on and that field does not contain the necessary value
 * @param {Object} field field object containing the properties of the field
 * @param {Object} values values of the Formik form
 * @param {string} name
 * @return {boolean} disabled
 */
const isFieldDisabled = (field, values) => {
  const { name, dependsOnOtherField } = field;
  let disabled = false;
  if (!!dependsOnOtherField) {
    // dependingField = field this field depends on
    const { name: dependingFieldName, list, value: dependingFieldValue } = dependsOnOtherField;
    if (list) {
      // if dependingField is a list and doesn't include the correct value, disable this field
      disabled = !values[dependingFieldName].includes(dependingFieldValue);
    } else {
      // if the depending field is not a list and is not set to the correct value, disable this field
      disabled = values[dependingFieldName] !== dependingFieldValue;
    }
  }
  // if this field is disabled, also clear its value
  if (disabled) {
    values[name] = '';
  }
  return disabled;
};

/**
 * Determines which field component to render depending on the field type and wraps it in a Material-UI Grid component
 * @param {Object} form Formik object
 * @param {Object} field field object containing the properties of the field
 */
export const FormFieldBuilder = ({ form, field }) => {
  const { name, type, size } = field;
  let newField;
  switch (type) {
    case 'select':
      newField = <FormSelect key={name} form={form} field={field} />;
      break;
    case 'radio':
      newField = (
        <FormRadioGroup key={name} form={form} field={field} isFieldDisabled={isFieldDisabled} />
      );
      break;
    case 'checklist':
      newField = <FormCheckList key={name} form={form} field={field} />;
      break;
    default:
      newField = (
        <FormTextField key={name} form={form} field={field} isFieldDisabled={isFieldDisabled} />
      );
  }
  return (
    // don't render the field if it is the confirmationNumber field
    name !== 'confirmationNumber' && (
      <Grid key={name} item md={!!size ? size : true} xs={12}>
        {newField}
      </Grid>
    )
  );
};
