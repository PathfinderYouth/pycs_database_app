import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FormFieldBuilder } from '../../fields';
import './style/IntakeForm.css';

/**
 * Renders the form fields depending on the
 * @param {Object} form Formik object
 * @param {Object} step form step object containing the step name and array of fields
 */
export const FormStep = ({ form, step }) => {
  const { stepName, fields } = step;

  return (
    <div className="intake-form-fieldsContainer">
      <Typography gutterBottom variant="h4">
        {stepName}
      </Typography>
      <Typography gutterBottom variant="body2" color="textSecondary">
        * indicates a required field
      </Typography>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <FormFieldBuilder key={field.name} form={form} field={field} />
        ))}
      </Grid>
    </div>
  );
};
