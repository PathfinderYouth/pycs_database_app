import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { ParticipantDetailEditView } from './ParticipantDetailEditView';
import { inject, observer } from 'mobx-react';
import { uiStore } from '../../injectables';
import './style/ParticipantDetailPage.css';

export const ParticipantDetailPage = inject('uiStore')(
  observer(() => {
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
          <IconButton onClick={handleClickChangeMode}>
            <EditIcon />
          </IconButton>
        </div>
        <Typography>Participant details go here</Typography>
        <Typography>{`Viewing step #${currentStep}`}</Typography>
      </>
    );

    return (
      <div className="participant-detail-container">
        {participantDetailMode === 'edit' ? (
          <ParticipantDetailEditView
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
    );
  }),
);
