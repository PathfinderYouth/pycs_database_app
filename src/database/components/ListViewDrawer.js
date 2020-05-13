import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
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
import { uiStore } from '../../injectables';
import './style/NavDrawer.css';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const ListViewDrawer = inject('uiStore')(
  observer(({ numNew, onParticipantViewChanged }) => {
    const classes = useStyles();
    const [participantsListExpanded, setParticipantsListExpanded] = useState(false);
    const { setCurrentViewMode, viewModes, collectionType } = uiStore;

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
        <ListItem
          button
          key="participants"
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
        </ListItem>
        <Collapse in={participantsListExpanded} timeout="auto">
          <List component="div" disablePadding>
            {statuses.map((status) => (
              <ListItem
                button
                key={status.name.toLowerCase()}
                className={classes.nested}
                onClick={() => {
                  setCurrentViewMode(viewModes.PARTICIPANT_LIST);
                  onParticipantViewChanged(collectionType.PERMANENT, status.name);
                }}
              >
                <ListItemIcon>{status.icon}</ListItemIcon>
                <ListItemText primary={status.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider />
        <ListItem
          button
          key="newApplications"
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
        </ListItem>
        <Divider />
        <ListItem
          button
          key="statistics"
          onClick={() => setCurrentViewMode(viewModes.STATISTICS)}
        >
          <ListItemIcon>
            <PieChart />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItem>
        <Divider />
        {/*//TODO: only render this if user is admin*/}
        <ListItem button key="staff" onClick={() => setCurrentViewMode(viewModes.STAFF_LIST)}>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Staff Management" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
}));
