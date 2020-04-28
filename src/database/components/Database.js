import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import { NavDrawer } from './NavDrawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

// container that holds all database UI objects
export const Database = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavDrawer />
      <div className={classes.content}>
        <Typography variant="h3">Database UI</Typography>
        {/* Components go here */}
        <div>
          <Link to="/">
            <Typography>Back to the intake form</Typography>
          </Link>
        </div>
      </div>
    </div>
  )
};
