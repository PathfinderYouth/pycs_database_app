import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

/**
 * Participant detail control button component
 * @param {string} ariaLabel aria-label value
 * @param {string} tooltip tooltip message for Tooltip component
 * @param {function} onClick onClick handler function
 * @param {confirm} confirm confirm message
 * @param {icon} icon Material-UI Icon component
 * @param {string} color color of the icon, if different from default
 * @param {string} size Material-UI icon size prop
 */
export const DetailButton = ({ ariaLabel, tooltip, onClick, confirm, icon: Icon, color, size }) => (
  <Tooltip title={tooltip} aria-label={ariaLabel}>
    <IconButton
      edge="end"
      size={size}
      onClick={() => {
        // if confirm message is defined, wrap onClick function in a confirm dialog
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
