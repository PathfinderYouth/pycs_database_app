import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {
  Check,
  Clear,
  HourglassEmptyOutlined,
  Inbox,
  Person,
  PieChart,
  Work,
} from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { participantStore, uiStore } from '../../injectables';
import { collectionType, viewModes } from '../../constants';
import { StyledListItem } from './StyledListItem';
import './style/NavDrawer.css';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const ListViewDrawer = inject(
  'uiStore',
  'participantStore',
)(
  observer(({ numNew, onParticipantViewChanged, onStaffViewChanged }) => {
    const classes = useStyles();
    const [participantsListExpanded, setParticipantsListExpanded] = useState(false);
    const { currentViewMode, setCurrentViewMode } = uiStore;
    const { collection } = participantStore;

    const statuses = [
      { name: 'Pending', icon: <HourglassEmptyOutlined /> },
      { name: 'Approved', icon: <Check /> },
      { name: 'Declined', icon: <Clear /> },
    ];

    const expandClick = (event) => {
      event.stopPropagation();
      setParticipantsListExpanded(!participantsListExpanded);
    };

    return (
      <div>
        <List disablePadding>
          <StyledListItem
            button
            selected={
              currentViewMode === viewModes.PARTICIPANT_LIST &&
              collection === collectionType.PERMANENT
            }
            onClick={() => {
              setCurrentViewMode(viewModes.PARTICIPANT_LIST);
              onParticipantViewChanged(collectionType.PERMANENT, null);
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Participants" />
            <div className="expandButton" onClick={expandClick}>
              {participantsListExpanded ? <ExpandLess /> : <ExpandMore />}
            </div>
          </StyledListItem>
          <Collapse in={participantsListExpanded} timeout="auto">
            <List component="div" disablePadding>
              {statuses.map((status) => (
                <StyledListItem
                  button
                  key={status.name}
                  className={classes.nested}
                  onClick={() => {
                    setCurrentViewMode(viewModes.PARTICIPANT_LIST);
                    onParticipantViewChanged(collectionType.PERMANENT, status.name);
                  }}
                >
                  <ListItemIcon>{status.icon}</ListItemIcon>
                  <ListItemText primary={status.name} />
                </StyledListItem>
              ))}
            </List>
          </Collapse>
          <Divider />
          <StyledListItem
            button
            selected={
              currentViewMode === viewModes.PARTICIPANT_LIST && collection === collectionType.NEW
            }
            onClick={() => {
              setCurrentViewMode(viewModes.PARTICIPANT_LIST);
              onParticipantViewChanged(collectionType.NEW, null);
            }}
          >
            <ListItemIcon>
              <Badge badgeContent={numNew} color="error" overlap="circle">
                <Inbox />
              </Badge>
            </ListItemIcon>
            <ListItemText primary="New Applications" />
          </StyledListItem>
          <Divider />
          <StyledListItem
            button
            selected={currentViewMode === viewModes.STATISTICS}
            onClick={() => setCurrentViewMode(viewModes.STATISTICS)}
          >
            <ListItemIcon>
              <PieChart />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </StyledListItem>
          <Divider />
          {/*//TODO: only render this if user is admin*/}
          <StyledListItem
            button
            selected={currentViewMode === viewModes.STAFF_LIST}
            onClick={() => {
              setCurrentViewMode(viewModes.STAFF_LIST);
              onStaffViewChanged();
            }}
          >
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary="Staff Management" />
          </StyledListItem>
          <Divider />
        </List>
      </div>
    );
  }),
);
