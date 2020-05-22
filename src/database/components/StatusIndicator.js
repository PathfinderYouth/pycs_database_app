import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import './style/StatusIndicator.css';

// colour styles for status indicators mapped to the status name
const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.contrastText,
  },
  approved: {
    backgroundColor: theme.palette.success.main,
  },
  archived: {
    backgroundColor: theme.palette.text.disabled,
  },
  declined: {
    backgroundColor: theme.palette.error.main,
  },
  deleted: {
    backgroundColor: theme.palette.text.disabled,
  },
  new: {
    backgroundColor: theme.palette.info.main,
  },
  pending: {
    backgroundColor: theme.palette.warning.light,
  },
}));

/**
 * Coloured status indicator component
 * @param {string} status approved | archived | declined | deleted | new | pending
 */
export const StatusIndicator = ({ status }) => {
  const classes = useStyles();

  return (
    <div className={`${classes[status]} ${classes.root} status-indicator-container`}>
      <Typography variant="button">{status}</Typography>
    </div>
  );
};
