import React, { useContext } from 'react';
import { inject, observer } from 'mobx-react';
import Card from '@material-ui/core/Card';
import Hidden from '@material-ui/core/Hidden';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { ParticipantDetailCreate } from './ParticipantDetailCreate';
import { ParticipantDetailEdit } from './ParticipantDetailEdit';
import { ParticipantDetailNotes } from './ParticipantDetailNotes';
import { ParticipantDetailActionPlan } from './ParticipantDetailActionPlan';
import { ParticipantDetailHistory } from './ParticipantDetailHistory';
import { ParticipantDetailView } from './ParticipantDetailView';
import { DetailButton } from './DetailButton';
import { participantStore, uiStore } from '../../../injectables';
import { participantDetailViewModes, viewModes } from '../../../constants';
import { getStepIndexFromStepName, participantDetailSteps } from '../../../fields';
import { AuthContext } from '../../../sign-in';
import '../style/ParticipantDetailPage.css';

/**
 * Entry point and container component for ParticipantDetailView, ParticipantDetailEdit,
 * & ParticipantDetailCreate
 */
export const ParticipantDetailPage = inject(
  'participantStore',
  'uiStore',
)(
  observer(() => {
    const { currentParticipant, setCurrentParticipant } = participantStore;
    const {
      currentParticipantDetailStep,
      currentParticipantDetailViewMode,
      setCurrentViewMode,
      setCurrentParticipantDetailViewMode,
      setCurrentParticipantDetailStep,
    } = uiStore;
    // if user is defined, get their display name (if defined), otherwise user their email
    const { currentUser } = useContext(AuthContext);
    let userID;
    if (!!currentUser) {
      userID = !!currentUser.displayName ? currentUser.displayName : currentUser.email;
    }
    const stepsLength = participantDetailSteps.length;

    /**
     * Steps the detail view back one step
     */
    const handleClickBack = () => {
      if (currentParticipantDetailStep > 0) {
        setCurrentParticipantDetailStep(currentParticipantDetailStep - 1);
      }
    };

    /**
     * Steps the detail view forward one step
     */
    const handleClickForward = () => {
      if (currentParticipantDetailStep < stepsLength - 1) {
        setCurrentParticipantDetailStep(currentParticipantDetailStep + 1);
      }
    };

    /**
     * Determines which content to populate the detail view with - notes step, history step, or a form step
     * If a form step, render the step using the Detail, Edit, or Create component using the
     * currentParticipantDetailView mode set in UIStore
     */
    const getParticipantDetailContents = () => {
      if (currentParticipantDetailStep === getStepIndexFromStepName('Notes')) {
        return <ParticipantDetailNotes user={userID} />;
      } else if (currentParticipantDetailStep === getStepIndexFromStepName('Action Plan')) {
        return <ParticipantDetailActionPlan user={userID} />;
      } else if (currentParticipantDetailStep === getStepIndexFromStepName('History')) {
        return <ParticipantDetailHistory participant={currentParticipant} />;
      } else {
        if (currentParticipantDetailViewMode === participantDetailViewModes.EDIT) {
          return (
            <ParticipantDetailEdit
              participant={currentParticipant}
              currentStep={currentParticipantDetailStep}
              user={userID}
              handleClickChangeMode={() =>
                setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW)
              }
              handleClickBack={handleClickBack}
              handleClickForward={handleClickForward}
              onSuccessfulEdit={setCurrentParticipant}
            />
          );
        } else if (currentParticipantDetailViewMode === participantDetailViewModes.CREATE) {
          return (
            <ParticipantDetailCreate
              currentStep={currentParticipantDetailStep}
              user={userID}
              handleClickChangeMode={() => setCurrentViewMode(viewModes.PARTICIPANT_LIST)}
            />
          );
        } else {
          return (
            <ParticipantDetailView
              participant={currentParticipant}
              currentStep={currentParticipantDetailStep}
              user={userID}
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
        {/* If the view is a narrow or mobile view, add navigation buttons to step though the form */}
        <Hidden mdUp>
          <div className="participant-detail-nav-buttons">
            {currentParticipantDetailStep > 0 && (
              <DetailButton
                ariaLabel="back"
                tooltip="Go back a step"
                onClick={handleClickBack}
                icon={ArrowBackIosIcon}
                size="small"
              />
            )}
            {currentParticipantDetailStep < stepsLength - 1 && (
              <DetailButton
                ariaLabel="forward"
                tooltip="Go forward a step"
                onClick={handleClickForward}
                icon={ArrowForwardIosIcon}
                size="small"
              />
            )}
          </div>
        </Hidden>
        <Card>
          <div className="participant-detail-contents">{getParticipantDetailContents()}</div>
        </Card>
      </div>
    );
  }),
);
