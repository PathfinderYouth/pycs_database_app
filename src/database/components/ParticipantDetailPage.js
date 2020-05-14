import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import { ParticipantDetailEditView } from './ParticipantDetailEditView';
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

    return (
      <div className="participant-detail-container">
        <Card>
          <div className="participant-detail-contents">
            {currentParticipantDetailViewMode === participantDetailViewModes.EDIT ? (
              <ParticipantDetailEditView
                participant={currentParticipant}
                collection={collection}
                currentStep={currentParticipantDetailStep}
                handleClickChangeMode={() =>
                  setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW)
                }
                onSuccessfulEdit={setCurrentParticipant}
              />
            ) : (
              <ParticipantDetailView
                currentStep={currentParticipantDetailStep}
                handleClickChangeMode={() =>
                  setCurrentParticipantDetailViewMode(participantDetailViewModes.EDIT)
                }
              />
            )}
          </div>
        </Card>
      </div>
    );
  }),
);
