import React from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import { ParticipantTabs } from './ParticipantTabs';
import { ArrowBack } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import { uiStore } from '../../injectables';
import './style/NavDrawer.css';
import { StyledListItem } from './StyledListItem';

export const DetailViewDrawer = inject('uiStore')(
  observer(() => {
    const {
      setCurrentViewMode,
      currentListViewMode,
      currentDetailViewMode,
      currentParticipantDetailViewMode,
      setCurrentParticipantDetailStep,
      setCurrentParticipantDetailViewMode,
      viewModes,
      participantDetailViewModes,
    } = uiStore;

    const handleClickBack = () => {
      setCurrentViewMode(currentListViewMode);
      if (currentParticipantDetailViewMode === participantDetailViewModes.EDIT) {
        if (window.confirm('Leave this page? Any unsaved changes will be lost.')) {
          setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW);
          setCurrentParticipantDetailStep(0);
        }
      } else {
        setCurrentParticipantDetailViewMode(participantDetailViewModes.VIEW);
        setCurrentParticipantDetailStep(0);
      }
    };

    const handleChangeParticipantTab = (tabIndex) => {
      setCurrentParticipantDetailStep(tabIndex);
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
