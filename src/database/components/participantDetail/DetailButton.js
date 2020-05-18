import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export const DetailButton = ({ ariaLabel, tooltip, onClick, confirm, icon: Icon, color, size }) => (
  <Tooltip title={tooltip} aria-label={ariaLabel}>
    <IconButton
      edge="end"
      size={size}
      onClick={() => {
        if (!!confirm) {
          if (window.confirm(confirm)) {
            onClick();
          }
        } else {
          onClick();
        }
      }}
    >
      <Icon color={color} />
    </IconButton>
  </Tooltip>
);