import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import { NavDrawer, TopNavBar } from './components';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// TODO Store this value only in Database.js, currently also declared in TopNavBar.js and NavDrawer.js
// Tried passing this value as props to both components but didn't work, not sure why.
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px', //TODO find a better way than using px.
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
        className={classes.content}>
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
