import React from 'react';
import Grid from '@material-ui/core/Grid';
import { FormTextField } from './FormTextField';
import { FormRadioGroup } from './FormRadioGroup';
import { FormCheckList } from './FormCheckList';
import { FormSelect } from './FormSelect';

export const FormFieldBuilder = ({ form, field }) => {
  const { name, type, size } = field;
  let newField = null;
  switch (type) {
    case 'select':
      newField = <FormSelect key={name} form={form} field={field} />;
      break;
    case 'radio':
      newField = (
        <FormRadioGroup key={name} form={form} field={field} />
      );
      break;
    case 'checklist':
      newField = (
        <FormCheckList key={name} form={form} field={field} />
      );
      break;
    default:
      newField = (
        <FormTextField key={name} form={form} field={field} />
      );
  }
  return (
    <Grid key={name} item md={!!size ? size : true} xs={12}>
      {newField}
    </Grid>
  );
};
