import React, { useState } from 'react';
import { RecordSearchBar } from './RecordSearchBar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Collapse } from '@material-ui/core';
import './style/NavDrawer.css';
import { Check, Clear, HourglassEmptyOutlined, Inbox, Person, Work } from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export const ListViewDrawer = (props) => {
  const classes = useStyles();
  const { handleClick, numNew } = props;
  const [participantsListExpanded, setParticipantsListExpanded] = useState(false);

  const statuses = [
    { name: 'Pending', icon: <HourglassEmptyOutlined /> },
    { name: 'Approved', icon: <Check /> },
    { name: 'Denied', icon: <Clear /> },
  ];

  const expandClick = () => {
    setParticipantsListExpanded(!participantsListExpanded);
  };

  return (
    <div>
      <div className={classes.container}>
        <RecordSearchBar />
      </div>
      <List>
        <Divider />
        <ListItem button key="participants" onClick={handleClick}>
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
                onClick={handleClick}
              >
                <ListItemIcon>{status.icon}</ListItemIcon>
                <ListItemText primary={status.name} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <Divider />
        <ListItem button key="newApplications" onClick={handleClick}>
          <ListItemIcon>
            <Badge badgeContent={numNew} color="error" overlap="circle">
              <Inbox />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="New Applications" />
        </ListItem>
        <Divider />
        {/*//TODO: only render this if user is staff*/}
        <ListItem button key="staff" onClick={handleClick}>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary="Staff Management" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};
