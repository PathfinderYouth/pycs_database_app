import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { formSteps } from '../../intake-form/components';

export const ParticipantTabs = (props) => {
  const stepNames = formSteps.map((step) => {
    if (step !== undefined && step.fields.length !== 0) {
      return step.stepName;
    }
  });

  const handleClick = (clickedCategory) => {
    props.handleClick(clickedCategory);
  };

  return (
    <>
      {stepNames.map((tab) => {
        return (
          tab !== undefined && (
            <ListItem button onClick={handleClick.bind(this, tab)} key={tab}>
              <ListItemText>{tab}</ListItemText>
            </ListItem>
          )
        );
      })}
    </>
  );
};
