import React from 'react';
import { inject, observer } from 'mobx-react';
import ListItemText from '@material-ui/core/ListItemText';
import { uiStore } from '../../../injectables';
import { participantDetailViewModes } from '../../../constants';
import { participantDetailStepNames, stepNames } from '../../../fields';
import { StyledListItem } from '../StyledListItem';

export const ParticipantTabs = inject('uiStore')(
  observer(({ handleClick }) => {
    const { currentParticipantDetailStep, currentParticipantDetailViewMode } = uiStore;
    const steps =
      currentParticipantDetailViewMode === participantDetailViewModes.CREATE
        ? stepNames
        : participantDetailStepNames;

    const handleCategoryClick = (clickedCategory) => {
      handleClick(clickedCategory);
    };

    return (
      <>
        {steps.map((tab, index) => {
          return (
            !!tab && (
              <StyledListItem
                button
                selected={currentParticipantDetailStep === index}
                onClick={() => handleCategoryClick(index)}
                key={tab}
              >
                <ListItemText>{tab}</ListItemText>
              </StyledListItem>
            )
          );
        })}
      </>
    );
  }),
);
