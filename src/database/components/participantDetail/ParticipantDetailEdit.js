import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { participantDetailSteps } from '../../../fields';
import { AuthContext } from '../../../sign-in';
import { participantDetailViewModes, status } from '../../../constants';
import service from '../../../facade/service';
import { ParticipantDetailForm } from './ParticipantDetailForm';
import '../style/ParticipantDetailPage.css';

export const ParticipantDetailEdit = ({
  participant,
  currentStep,
  handleClickChangeMode,
  onSuccessfulEdit,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const step = participantDetailSteps[currentStep];
  const { status: participantStatus } = participant;
  const {
    currentUser: { email, displayName },
  } = useContext(AuthContext);
  const userID = !!displayName ? displayName : email;

  const handleSubmit = (values, setSubmitting) => {
    const db = service.getDatabase();
    if (participant !== values) { // if there were changes
      participantStatus === status.NEW
        ? db.updateNew(
            participant, // old data
            values, // new data from form
            userID, // user
            (updatedParticipant) => {
              setSubmitting(false);
              enqueueSnackbar('Participant record updated.', {
                variant: 'success',
              });
              onSuccessfulEdit(updatedParticipant);
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
            participant,
            values,
            userID,
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
      handleClickChangeMode={handleClickChangeMode}
      step={step}
    />
  );
};
