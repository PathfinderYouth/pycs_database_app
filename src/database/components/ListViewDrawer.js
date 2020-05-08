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
import { Check, Clear, HourglassEmptyOutlined, Inbox, Person } from '@material-ui/icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export const ListViewDrawer = (props) => {
  const { handleClick, numNew, classes } = props;
  const [participantsListExpanded, setParticipantsListExpanded] = useState(true);

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
          <ListItemText primary="All Participants" />
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
        <ListItem button key="New Applications" onClick={handleClick}>
          <ListItemIcon>
            <Badge badgeContent={numNew} color="secondary" overlap="circle">
              <Inbox />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="New Applications" />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};
