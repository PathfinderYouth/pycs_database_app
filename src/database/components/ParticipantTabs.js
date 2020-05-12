import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { stepNames } from '../../intake-form/components';

export const ParticipantTabs = ({handleClick}) => {
  const handleCategoryClick = (clickedCategory) => {
    handleClick(clickedCategory);
    console.log(`Clicked on ${stepNames[clickedCategory]}`)
  };

  return (
    <>
      {stepNames.map((tab, index) => {
        return (
          tab !== undefined && (
            <ListItem button onClick={() => handleCategoryClick(index)} key={tab}>
              <ListItemText>{tab}</ListItemText>
            </ListItem>
          )
        );
      })}
    </>
  );
};
