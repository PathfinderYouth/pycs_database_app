import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import { collectionType, participantDetailViewModes } from '../../../constants';
import { getStepIndexFromStepName, participantDetailStepNames, stepNames } from '../../../fields';
import { StyledListItem } from '../StyledListItem';

/**
 *
 * @param {function} handleClick tab click handler
 * @param {string} viewMode participant detail view mode - view | edit | create
 * @param {int} stepIndex index of the current step being viewed
 * @param {string} collection current collection being viewed - new | permanent
 */
export const ParticipantTabs = ({ handleClick, viewMode, stepIndex, collection }) => {
  let steps;
  if (collection === collectionType.NEW) {
    steps = participantDetailStepNames.filter(
      (stepName) => !['Action Plan', 'Notes'].includes(stepName),
    );
  } else {
    steps = viewMode !== participantDetailViewModes.VIEW ? stepNames : participantDetailStepNames;
  }

  /**
   * Click handler for tabs
   * @param {int} clickedCategory index of tab that was just clicked
   */
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
