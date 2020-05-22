import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
    '&$selected': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  },
  selected: {},
}));

/**
 * Styled list item component
 * @param {Object} props component props
 */
export const StyledListItem = (props) => {
  const classes = useStyles();
  return <ListItem classes={classes} {...props} />;
};
