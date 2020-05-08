import React from 'react';
import './style/NavDrawer.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const RecordViewDrawer = (props) => {
  const tabs = [
    'Basic Information',
    'Employment Equity',
    'Medical Information',
    'Current Situation',
    'Needs and Hopes',
  ];

  return (
    <List>
      {tabs.map((category) => (
        <ListItem button onClick={props.handleClick} key={category}>
          <ListItemText>{category}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
