import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { participantDetailSteps, initialValues } from '../../fields';
import { ParticipantDetailForm } from './ParticipantDetailForm';
import service from '../../facade/service';
import { AuthContext } from '../../sign-in';

export const ParticipantDetailCreate = ({
  currentStep,
  handleClickChangeMode,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const step = participantDetailSteps[currentStep];
  const {
    currentUser: { email: userID },
  } = useContext(AuthContext);

  const handleClickOk = () => {
    return window.confirm('Create new participant record?');
  };

  const handleClickCancel = () => {
    if (window.confirm('Discard changes? Record will not be saved.')) {
      handleClickChangeMode();
    }
  };

  const handleSubmit = (values, setSubmitting) => {
    const db = service.getDatabase();
    db.addPermanent(
          values,
          userID,
          (newParticipant) => {
            setSubmitting(false);
            enqueueSnackbar('Participant record created.', {
              variant: 'success',
            });
            handleClickChangeMode();
          },
          (error) => {
            enqueueSnackbar('There was a problem creating the participant record.', {
              variant: 'error',
            });
            handleClickChangeMode();
          },
        );
  };

  return (
    <ParticipantDetailForm
      formTitle='Create participant record'
      initialValues={initialValues}
      handleSubmit={handleSubmit}
      handleClickOk={handleClickOk}
      handleClickCancel={handleClickCancel}
      step={step}
    />
  );
};
