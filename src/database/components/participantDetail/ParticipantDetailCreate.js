import React from 'react';
import { useSnackbar } from 'notistack';
import { initialValues, participantDetailSteps } from '../../../fields';
import { ParticipantDetailForm } from './ParticipantDetailForm';
import { participantDetailViewModes } from '../../../constants';
import service from '../../../facade/service';

export const ParticipantDetailCreate = ({ currentStep, handleClickChangeMode, user }) => {
  const { enqueueSnackbar } = useSnackbar();
  const step = participantDetailSteps[currentStep];

  const handleSubmit = (values, setSubmitting) => {
    const db = service.getDatabase();
    db.addPermanent(
      values,
      user,
      (newParticipant) => {
        setSubmitting(false);
        enqueueSnackbar('Participant record created.', {
          variant: 'success',
        });
        handleClickChangeMode();
      },
      (error) => {
        let message = error.name === 'DuplicateError'
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
