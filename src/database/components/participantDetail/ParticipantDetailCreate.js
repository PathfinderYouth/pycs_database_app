import React from 'react';
import { useSnackbar } from 'notistack';
import { initialValues, participantDetailSteps } from '../../../fields';
import { ParticipantDetailForm } from './ParticipantDetailForm';
import { participantDetailViewModes } from '../../../constants';
import service from '../../../facade/service';

/**
 * Component used to create a new participant record from within the database application
 * @param {int} currentStep index of the current step in participantDetailSteps
 * @param {function} handleClickChangeMode toggle function that switches between view and edit mode in UIStore
 * @param {user} string userID (display name or email) of the currently-logged-in user
 */
export const ParticipantDetailCreate = ({ currentStep, handleClickChangeMode, user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const step = participantDetailSteps[currentStep];

  /**
   * OnSubmit handler function. Initiate a connection to the database to add a new participant record to the
   * permanent collection in Firestore. Displays a success or failure snackbar once complete.
   * @param {Object} values form values object
   * @param {function} setSubmitting Formik function to set submitting status
   */
  const handleSubmit = (values, setSubmitting) => {
    const db = service.getDatabase();
    db.addPermanent(
      values,
      user,
      () => {
        setSubmitting(false);
        enqueueSnackbar('Participant record created.', {
          variant: 'success',
        });
        handleClickChangeMode();
      },
      (error) => {
        let message =
          error.name === 'DuplicateError'
            ? 'Unable to save participant record, record with that SIN already exists'
            : 'There was a problem saving the participant record.';
        enqueueSnackbar(message, {
          variant: 'error',
        });
        handleClickChangeMode();
      },
    );
  };

  return (
    <ParticipantDetailForm
      formTitle="Create participant record"
      initialValues={initialValues}
      participantDetailViewMode={participantDetailViewModes.CREATE}
      handleSubmit={handleSubmit}
      handleClickToggleEdit={handleClickChangeMode}
      step={step}
    />
  );
};
