import React, { useState } from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import { NavDrawer, TopNavBar } from './components';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '40px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },

  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

}));

// container that holds all database UI objects
export const Database = () => {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerState(true);
  }

  const handleDrawerClose = () => {
    setDrawerState(false);
  }

  return (
    <div className={classes.root}>
      <TopNavBar handleDrawerOpen={handleDrawerOpen} handleDrawerState={drawerState} />
      <NavDrawer handleDrawerClose={handleDrawerClose} handleDrawerState={drawerState} />
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: drawerState,
        })}>
        {/* TODO: Appbar goes here */}
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
