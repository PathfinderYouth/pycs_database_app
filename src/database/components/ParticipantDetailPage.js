import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import { participantDetailSteps } from '../../fields';
import { ParticipantDetailEditView } from './ParticipantDetailEditView';
import { ParticipantDetailNotes } from './ParticipantDetailNotes';
import { ParticipantDetailHistory } from './ParticipantDetailHistory';
import { inject, observer } from 'mobx-react';
import { participantStore, uiStore } from '../../injectables';
import './style/ParticipantDetailPage.css';

export const ParticipantDetailPage = inject(
  'participantStore',
  'uiStore',
)(
  observer(() => {
    const { currentParticipant, collection, setCurrentParticipant } = participantStore;
    const {
      currentParticipantDetailStep,
      currentParticipantDetailViewMode,
      setCurrentParticipantDetailViewMode,
      participantDetailViewModes,
    } = uiStore;
    const notesStep = participantDetailSteps.length - 2;
    const historyStep = participantDetailSteps.length - 1;

    /**
     * Placeholder component for detail view mode
     */
    const ParticipantDetailView = ({ currentParticipant, currentStep, handleClickChangeMode }) => (
      <>
        <div className="participant-detail-header">
          <Typography variant="h5">Participant Details</Typography>
          <Tooltip title="Edit participant record" aria-label="edit">
            <IconButton onClick={handleClickChangeMode}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Typography>Participant details go here</Typography>
        <Typography>{`Viewing step #${currentStep}`}</Typography>
      </>
    );

    const getParticipantDetailContents = () => {
      if (currentParticipantDetailStep === notesStep) {
        return <ParticipantDetailNotes/>;
      } else if (currentParticipantDetailStep === historyStep) {
        return <ParticipantDetailHistory participant={currentParticipant} />;
      } else {
        if (currentParticipantDetailViewMode === participantDetailViewModes.EDIT) {
          return (
            <ParticipantDetailEditView
              participant={currentParticipant}
              collection={collection}
              currentStep={currentParticipantDetailStep}
              handleClickChangeMode={() =>
                setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW)
              }
              onSuccessfulEdit={setCurrentParticipant}
            />
          );
        } else {
          return (
            <ParticipantDetailView
              currentStep={currentParticipantDetailStep}
              handleClickChangeMode={() =>
                setCurrentParticipantDetailViewMode(participantDetailViewModes.EDIT)
              }
            />
          );
        }
      }
    };

    return (
      <div className="participant-detail-container">
        <Card>
          <div className="participant-detail-contents">{getParticipantDetailContents()}</div>
        </Card>
      </div>
    );
  }),
);
