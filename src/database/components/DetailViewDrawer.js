import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './style/NavDrawer.css';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ArrowBack } from '@material-ui/icons';
import Divider from '@material-ui/core/Divider';

export const DetailViewDrawer = (props) => {
  const { handleClickBack, subComponent } = props;
  return (
    <List>
      <ListItem key="back" button onClick={handleClickBack}>
        <ListItemIcon>
          <ArrowBack />
        </ListItemIcon>
        <ListItemText primary={'Back'} />
      </ListItem>
      <Divider />
      {subComponent}
    </List>
  );
};
