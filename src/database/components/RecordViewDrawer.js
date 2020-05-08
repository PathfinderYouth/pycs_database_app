import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { formSteps } from '../../intake-form/components';
import './style/NavDrawer.css';

export const RecordViewDrawer = (props) => {
  const stepNames = formSteps.map((step) => {
    if (step !== undefined && step.fields.length !== 0) {
      return step.stepName;
    }
  });
  return (
    <List>
      {stepNames.map((category) => {
        return (
          category !== undefined && (
            <ListItem button onClick={props.handleClick} key={category}>
              <ListItemText>{category}</ListItemText>
            </ListItem>
          )
        );
      })}
    </List>
  );
};
