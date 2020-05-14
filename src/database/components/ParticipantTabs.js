import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';
import { stepNames } from '../../fields';
import { StyledListItem } from './StyledListItem';
import { inject, observer } from 'mobx-react';
import { uiStore } from '../../injectables';

export const ParticipantTabs = inject('uiStore')(
  observer(({ handleClick }) => {
    const {
      currentParticipantDetailStep,
    } = uiStore;

    const handleCategoryClick = (clickedCategory) => {
      handleClick(clickedCategory);
    };

    return (
      <>
        {stepNames.map((tab, index) => {
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
