import React, { useState } from 'react';
import { RecordSearchBar } from './RecordSearchBar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import './style/NavDrawer.css';
import { Collapse } from '@material-ui/core';

export const ListViewDrawer = (props) => {
  const { handleClick, numNew, classes } = props;
  const [
    participantsListExpanded,
    setParticipantsListExpanded,
  ] = useState(true);

  const expandClick = () => {
    setParticipantsListExpanded(!participantsListExpanded);
  };

  return (
    <div>
      <List>
        <ListItem button key="New Applications" onClick={handleClick}>
          <Badge badgeContent={numNew} color="secondary">
            <ListItemText
              primary="New Applications"
              className="listItemWithBadge"
            />
          </Badge>
        </ListItem>
        <Divider />
        <ListItem button key="participants" onClick={handleClick}>
          <ListItemText primary="All Participants" />
          <div className="expandButton" onClick={expandClick}>
            {participantsListExpanded ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )}
          </div>
        </ListItem>
        <Collapse in={participantsListExpanded} timeout="auto">
          <List component="div" disablePadding>
            {['Pending', 'Approved', 'Denied'].map((text) => (
              <ListItem
                button
                key={text}
                className={classes.nested}
                onClick={handleClick}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
      <div className={classes.container}>
        <RecordSearchBar />
      </div>
    </div>
  );
};
