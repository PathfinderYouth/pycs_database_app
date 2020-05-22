import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import { collectionType, participantDetailViewModes } from '../../../constants';
import { participantDetailStepNames, stepNames, getStepIndexFromStepName } from '../../../fields';
import { StyledListItem } from '../StyledListItem';

export const ParticipantTabs = ({ handleClick, viewMode, stepIndex, collection }) => {
  let steps;
  if (collection === collectionType.NEW) {
    steps = participantDetailStepNames.filter(
      (stepName) => !['Action Plan', 'Notes'].includes(stepName),
    );
  } else {
    steps = viewMode !== participantDetailViewModes.VIEW ? stepNames : participantDetailStepNames;
  }

  const handleCategoryClick = (clickedCategory) => {
    handleClick(clickedCategory);
  };

  return (
    <>
      {steps.map((stepName) => {
        const index = getStepIndexFromStepName(stepName);
        return (
          !!stepName && (
            <StyledListItem
              button
              selected={stepIndex === index}
              onClick={() => handleCategoryClick(index)}
              key={stepName}
            >
              <ListItemText>{stepName}</ListItemText>
            </StyledListItem>
          )
        );
      })}
    </>
  );
};
