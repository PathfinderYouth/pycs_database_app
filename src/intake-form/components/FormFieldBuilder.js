import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormTextField } from './FormTextField';
import { FormRadioGroup } from './FormRadioGroup';
import { FormCheckList } from './FormCheckList';
import { FormSelect } from './FormSelect';

const isFieldDisabled = (dependsOnOtherField, values, name) => {
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

export const FormFieldBuilder = ({ form, field }) => {
  const { name, type, size } = field;
  let newField = null;
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
    <Grid key={name} item md={!!size ? size : true} xs={12}>
      {newField}
    </Grid>
  );
};
