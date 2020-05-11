import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FormFieldBuilder } from './FormFieldBuilder';
import './FormSteps.css';

export const FormStep = ({ form, step }) => {
  const { stepName, fields } = step;

  return (
    <div className="form-fieldsContainer">
      <Typography gutterBottom variant="h4">
        {stepName}
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        * indicates a required field
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <FormFieldBuilder
            key={field.name}
            form={form}
            field={field}
          />
        ))}
      </Grid>
    </div>
  );
};
