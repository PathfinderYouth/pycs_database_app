import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
// import { FormTextField } from './FormTextField';
// import { FormRadioGroup } from './FormRadioGroup';
// import { FormCheckList } from './FormCheckList';
// import { FormSelect } from './FormSelect';
import { FormFieldBuilder } from './FormFieldBuilder'
import './FormSteps.css';

export const FormStep = ({ form, step }) => {
  const { stepName, fields } = step;

  // const buildField = (form, field) => {
  //   const { name, type, size } = field;
  //   let newField = null;
  //   switch (type) {
  //     case 'select':
  //       newField = (
  //         <FormSelect key={name} form={form} field={field} />
  //       );
  //       break;
  //     case 'radio':
  //       newField = (
  //         <FormRadioGroup key={name} form={form} field={field} />
  //       );
  //       break;
  //     case 'checklist':
  //       newField = (
  //         <FormCheckList key={name} form={form} field={field} />
  //       );
  //       break;
  //     default:
  //       newField = (
  //         <FormTextField key={name} form={form} field={field} />
  //       );
  //   }
  //   return (
  //     <Grid key={name} item md={!!size ? size : true} xs={12}>
  //       {newField}
  //     </Grid>
  //   );
  // };

  return (
    <div className="fieldsContainer">
      <Typography gutterBottom variant="h4">
        {stepName}
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        * indicates a required field
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field) => <FormFieldBuilder key={field.name} form={form} field={field} />)}
      </Grid>
    </div>
  );
};
