import React, { useState } from 'react';
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
    const { currentParticipant, collection } = participantStore;
    const { currentParticipantDetailStep } = uiStore;
    const [participantDetailMode, setParticipantDetailMode] = useState('view'); // view or edit

    const handleClickEditMode = () => {
      setParticipantDetailMode('edit');
    };

    const handleClickViewMode = () => {
      setParticipantDetailMode('view');
    };

    /**
     * Placeholder component for detail view mode
     */
    const ParticipantDetailView = ({ currentStep, handleClickChangeMode }) => (
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
            {participantDetailMode === 'edit' ? (
              <ParticipantDetailEditView
                participant={currentParticipant}
                collection={collection}
                currentStep={currentParticipantDetailStep}
                handleClickChangeMode={handleClickViewMode}
              />
            ) : (
              <ParticipantDetailView
                currentStep={currentParticipantDetailStep}
                handleClickChangeMode={handleClickEditMode}
              />
            )}
          </div>
        </Card>
      </div>
    );
  }),
);
