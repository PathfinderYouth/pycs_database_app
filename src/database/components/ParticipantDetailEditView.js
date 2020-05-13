import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { FormFieldBuilder, formSteps } from '../../fields';
import service from '../../facade/service';
import { participantStore } from '../../injectables';

export const ParticipantDetailEditView = ({
  participant,
  collection,
  currentStep,
  handleClickChangeMode,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { collectionType } = participantStore;

  const handleClickOk = () => {
    return window.confirm('Confirm changes?');
  };

  const handleClickCancel = () => {
    if (window.confirm('Discard changes? Changes will not be saved.')) {
      handleClickChangeMode();
    }
  };

  const handleSubmit = (values, setSubmitting) => {
    const db = service.getDatabase();
    collection === collectionType.NEW
      ? db.updateNew(
          'docID', // TODO: replace with real document ID
          values,
          (docId) => {
            setSubmitting(false);
            enqueueSnackbar('Participant record updated.', {
              variant: 'success',
            });
            handleClickChangeMode();
          },
          (error) => {
            enqueueSnackbar('There was a problem updating the participant record.', {
              variant: 'error',
            });
            handleClickChangeMode();
          },
        )
      : db.updatePermanent(
          'docID', // TODO: replace with real document ID
          values,
          (docId) => {
            setSubmitting(false);
            enqueueSnackbar('Participant record updated.', {
              variant: 'success',
            });
            handleClickChangeMode();
          },
          (error) => {
            enqueueSnackbar('There was a problem updating the participant record.', {
              variant: 'error',
            });
            handleClickChangeMode();
          },
        );
  }

  return (
    <Formik
      initialValues={participant}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, setSubmitting)
      }}
    >
      {(form) => (
        <>
          <div className="participant-detail-header">
            <Typography variant="h6">
              {`Edit Participant Details - ${formSteps[currentStep].stepName}`}
            </Typography>
            <div>
              <Tooltip title="Confirm changes" aria-label="confirm">
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
