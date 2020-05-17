import React from 'react';
import { inject, observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import { ParticipantDetailCreate } from './ParticipantDetailCreate';
import { ParticipantDetailEdit } from './ParticipantDetailEdit';
import { ParticipantDetailNotes } from './ParticipantDetailNotes';
import { ParticipantDetailHistory } from './ParticipantDetailHistory';
import { ParticipantDetailView } from './ParticipantDetailView';
import { participantStore, uiStore } from '../../../injectables';
import { participantDetailViewModes, viewModes } from '../../../constants';
import { participantDetailSteps } from '../../../fields';
import '../style/ParticipantDetailPage.css';

export const ParticipantDetailPage = inject(
  'participantStore',
  'uiStore',
)(
  observer(() => {
    const { currentParticipant, collection, setCurrentParticipant } = participantStore;
    const {
      currentParticipantDetailStep,
      currentParticipantDetailViewMode,
      setCurrentViewMode,
      setCurrentParticipantDetailViewMode,
    } = uiStore;
    const notesStep = participantDetailSteps.length - 2;
    const historyStep = participantDetailSteps.length - 1;

    const getParticipantDetailContents = () => {
      if (currentParticipantDetailStep === notesStep) {
        return <ParticipantDetailNotes />;
      } else if (currentParticipantDetailStep === historyStep) {
        return <ParticipantDetailHistory participant={currentParticipant} />;
      } else {
        if (currentParticipantDetailViewMode === participantDetailViewModes.EDIT) {
          return (
            <ParticipantDetailEdit
              participant={currentParticipant}
              collection={collection}
              currentStep={currentParticipantDetailStep}
              handleClickChangeMode={() =>
                setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW)
              }
              onSuccessfulEdit={setCurrentParticipant}
            />
          );
        } else if (currentParticipantDetailViewMode === participantDetailViewModes.CREATE) {
          return (
            <ParticipantDetailCreate
              currentStep={currentParticipantDetailStep}
              handleClickChangeMode={() => setCurrentViewMode(viewModes.PARTICIPANT_LIST)}
            />
          );
        } else {
          return (
            <ParticipantDetailView
              participant={currentParticipant}
              collection={collection}
              currentStep={currentParticipantDetailStep}
              handleClickChangeMode={() =>
                setCurrentParticipantDetailViewMode(participantDetailViewModes.EDIT)
              }
              handleClickChangeView={() => {
                setCurrentViewMode(viewModes.PARTICIPANT_LIST);
              }}
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
