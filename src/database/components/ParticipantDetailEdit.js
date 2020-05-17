import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { participantDetailSteps } from '../../fields';
import { ParticipantDetailForm } from './ParticipantDetailForm';
import service from '../../facade/service';
import { AuthContext } from '../../sign-in';
import { collectionType, participantDetailViewModes } from '../../constants';
import './style/ParticipantDetailPage.css';

export const ParticipantDetailEdit = ({
  participant,
  collection,
  currentStep,
  handleClickChangeMode,
  onSuccessfulEdit,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const step = participantDetailSteps[currentStep];
  const {
    currentUser: { email, displayName },
  } = useContext(AuthContext);
  const userID = !!displayName ? displayName : email;

  const handleSubmit = (values, setSubmitting) => {
    const db = service.getDatabase();
    collection === collectionType.NEW
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
            enqueueSnackbar('There was a problem updating the participant record.', {
              variant: 'error',
            });
            handleClickChangeMode();
          },
        );
  };

  return (
    <ParticipantDetailForm
      formTitle='Edit participant details'
      initialValues={participant}
      participantDetailViewMode={participantDetailViewModes.EDIT}
      handleSubmit={handleSubmit}
      handleClickChangeMode={handleClickChangeMode}
      step={step}
    />
  );
};
