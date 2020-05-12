import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { mockParticipantRecord } from './mockParticipantRecord';
import { useSnackbar } from 'notistack';
import { FormFieldBuilder, formSteps } from '../../fields';

export const ParticipantDetailEditView = ({ currentStep, handleClickChangeMode }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOk = () => {
    if (window.confirm('Confirm changes?')) {
      // TODO: show success message on successful database update, fail message if failed
      enqueueSnackbar('Participant record updated.', {
        variant: 'success',
      });
      handleClickChangeMode();
      return true;
    }
    return false;
  };

  const handleClickCancel = () => {
    if (window.confirm('Cancel editing? Changes will not be saved.')) {
      handleClickChangeMode();
    }
  };

  return (
    <Formik
      initialValues={mockParticipantRecord}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          // setSubmitting(false);
        });
      }}
    >
      {(form) => (
        <>
          <div className="participant-detail-header">
            <Typography variant="h6">
              {`Edit Participant Details - ${formSteps[currentStep].stepName}`}
            </Typography>
            <div>
              <IconButton
                onClick={() => {
                  if (handleClickOk()) {
                    form.submitForm();
                  }
                }}
              >
                <DoneIcon />
              </IconButton>
              <IconButton onClick={handleClickCancel}>
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="participant-detail-contents">
            <Grid container spacing={2}>
              {formSteps[currentStep].fields.map((field) => (
                <FormFieldBuilder key={field.name} form={form} field={field} />
              ))}
            </Grid>
          </div>
        </>
      )}
    </Formik>
  );
};
