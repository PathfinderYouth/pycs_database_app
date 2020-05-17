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
  observer(() => {
    const {
      setCurrentViewMode,
      currentListViewMode,
      currentDetailViewMode,
      currentParticipantDetailViewMode,
      setCurrentParticipantDetailStep,
      setCurrentParticipantDetailViewMode,
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