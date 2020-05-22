import React from 'react';
import { useSnackbar } from 'notistack';
import { participantDetailSteps } from '../../../fields';
import { participantDetailViewModes, status } from '../../../constants';
import service from '../../../facade/service';
import { ParticipantDetailForm } from './ParticipantDetailForm';
import '../style/ParticipantDetailPage.css';

/**
 * Component used to edit participant details
 * @param {Object} participant participant data object
 * @param {int} currentStep index of the current step in participantDetailSteps
 * @param {user} string userID (display name or email) of the currently-logged-in user
 * @param {function} handleClickChangeMode toggle function that switches between view and edit mode in UIStore
 * @param {function} onSuccessfulEdit callback function that updates currentParticipant in ParticipantStore
 */
export const ParticipantDetailEdit = ({
  participant,
  currentStep,
  user,
  handleClickChangeMode,
  onSuccessfulEdit,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const step = participantDetailSteps[currentStep];
  const participantStatus = !!participant ? participant.status : undefined;

  /**
   * OnSubmit handler function. If changes were made (participant data has different values than the form),
   * initiate a connection to the database to push the changes. Displays a success or failure snackbar once
   * complete. If no changes were made, snackbar informing the user.
   * @param {Object} values form values object
   * @param {function} setSubmitting Formik function to set submitting status
   */
  const handleSubmit = (values, setSubmitting) => {
    const db = service.getDatabase();
    if (participant !== values) {
      // if there were changes
      participantStatus === status.NEW
        ? db.updateNew(
            participant, // old data
            values, // new data from form
            user,
            (updatedParticipant) => {
              setSubmitting(false);
              enqueueSnackbar('Participant record updated.', {
                variant: 'success',
              });
              onSuccessfulEdit(updatedParticipant);
              handleClickChangeMode();
            },
            () => {
              enqueueSnackbar('There was a problem updating the participant record.', {
                variant: 'error',
              });
              handleClickChangeMode();
            },
          )
        : db.updatePermanent(
            participant,
            values,
            user,
            (updatedParticipant) => {
              setSubmitting(false);
              enqueueSnackbar('Participant record updated.', {
                variant: 'success',
              });
              onSuccessfulEdit(updatedParticipant);
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
    } else {
      enqueueSnackbar('No changes made.');
      handleClickChangeMode();
    }
  };

  return (
    <ParticipantDetailForm
      formTitle="Edit participant details"
      initialValues={participant}
      participantDetailViewMode={participantDetailViewModes.EDIT}
      handleSubmit={handleSubmit}
      handleClickToggleEdit={handleClickChangeMode}
      step={step}
    />
  );
};
