import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { Formik } from 'formik';
import { FormFieldBuilder } from '../../fields';

export const ParticipantDetailForm = ({
  formTitle,
  initialValues,
  handleSubmit,
  handleClickOk,
  handleClickCancel,
  step,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting);
      }}
    >
      {(form) => (
        <>
          <div className="participant-detail-header">
            <Typography variant="h6">{`${formTitle} - ${step.stepName}`}</Typography>
            <div>
              <Tooltip title="Save participant record" aria-label="confirm">
                <IconButton
                  onClick={() => {
                    if (handleClickOk()) {
                      form.submitForm();
                    }
                  }}
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Discard changes" aria-label="discard">
                <IconButton onClick={handleClickCancel}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="participant-detail-form-contents">
            <Grid container spacing={2}>
              {step.fields.map((field) => (
                <FormFieldBuilder key={field.name} form={form} field={field} />
              ))}
            </Grid>
          </div>
        </>
      )}
    </Formik>
  );
};
