import React from 'react';
import { inject, observer } from 'mobx-react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { ArrowBack } from '@material-ui/icons';
import { uiStore } from '../../../injectables';
import { participantDetailViewModes, viewModes } from '../../../constants';
import { StyledListItem } from '../StyledListItem';
import { ParticipantTabs } from './ParticipantTabs';
import '../style/NavDrawer.css';

export const DetailViewDrawer = inject('uiStore')(
  observer(({handleDrawerClose}) => {
    const {
      setCurrentViewMode,
      currentListViewMode,
      currentDetailViewMode,
      currentParticipantDetailViewMode,
      setCurrentParticipantDetailStep,
      setCurrentParticipantDetailViewMode,
    } = uiStore;

    const handleResetPage = () => {
        setCurrentViewMode(currentListViewMode);
        setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW);
        setCurrentParticipantDetailStep(0);
        handleDrawerClose()
    }

    const handleClickBack = () => {
      if (
        currentParticipantDetailViewMode === participantDetailViewModes.EDIT &&
        window.confirm('Leave this page? Any unsaved changes will be lost.')
      ) {
        handleResetPage()
      } else {
        handleResetPage()
      }
    };

    const handleChangeParticipantTab = (tabIndex) => {
      setCurrentParticipantDetailStep(tabIndex);
      handleDrawerClose()
    };

    return (
      <List disablePadding>
        <StyledListItem key="back" button onClick={handleClickBack}>
          <ListItemIcon>
            <ArrowBack />
          </ListItemIcon>
          <ListItemText primary={'Back'} />
        </StyledListItem>
        <Divider />
        {currentDetailViewMode === viewModes.PARTICIPANT_DETAIL && (
          <ParticipantTabs handleClick={handleChangeParticipantTab} />
        )}
      </List>
    );
  }),
);
