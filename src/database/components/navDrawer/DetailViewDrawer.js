import React from 'react';
import { inject, observer } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { ArrowBack } from '@material-ui/icons';
import { participantStore, uiStore } from '../../../injectables';
import { participantDetailViewModes, viewModes } from '../../../constants';
import { StyledListItem } from '../StyledListItem';
import { ParticipantTabs } from './ParticipantTabs';
import '../style/NavDrawer.css';

/**
 * Nav drawer component for Participant detail views
 * @param {function} handleDrawerClose drawer open handler for when the drawer hides on narrow views
 */
export const DetailViewDrawer = inject(
  'participantStore',
  'uiStore',
)(
  observer(({ handleDrawerClose }) => {
    const { collection } = participantStore;
    const {
      setCurrentViewMode,
      currentListViewMode,
      currentDetailViewMode,
      currentParticipantDetailStep,
      currentParticipantDetailViewMode,
      setCurrentParticipantDetailStep,
      setCurrentParticipantDetailViewMode,
    } = uiStore;

    /**
     * Resets the page back to initial settings when the user navigates away
     */
    const handleResetPage = () => {
      setCurrentViewMode(currentListViewMode);
      setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW);
      setCurrentParticipantDetailStep(0);
      handleDrawerClose();
    };

    /**
     * Handler for clicking the back button
     */
    const handleClickBack = () => {
      if (
        currentParticipantDetailViewMode !== participantDetailViewModes.VIEW &&
        window.confirm('Leave this page? Any unsaved changes will be lost.')
      ) {
        handleResetPage();
      } else {
        handleResetPage();
      }
    };

    const handleChangeParticipantTab = (tabIndex) => {
      setCurrentParticipantDetailStep(tabIndex);
      handleDrawerClose();
    };

    return (
      <List disablePadding>
        <StyledListItem key="back" button onClick={handleClickBack}>
          <ListItemIcon>
            <ArrowBack />
          </ListItemIcon>
          <ListItemText primary="Back" />
        </StyledListItem>
        <Divider />
        {currentDetailViewMode === viewModes.PARTICIPANT_DETAIL && (
          <ParticipantTabs
            handleClick={handleChangeParticipantTab}
            viewMode={currentParticipantDetailViewMode}
            stepIndex={currentParticipantDetailStep}
            collection={collection}
          />
        )}
      </List>
    );
  }),
);
