import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import { NavDrawer, TopNavBar } from './components';
import { makeStyles } from '@material-ui/core/styles';
import { RecordListContainer } from './components';
import { observer, inject } from 'mobx-react';
import { participantStore } from '../injectables';

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

// for testing table view
const records = [
  {
    lastName: 'McTest',
    firstName: 'Test',
    address: '123 1st St',
    city: 'Surrey',
    id: 1,
  },
  {
    lastName: 'McBob',
    firstName: 'Bob',
    address: '125 2nd St',
    city: 'Surrey',
    id: 2,
  },
];

// container that holds all database UI objects
export const Database = inject('participantStore')(
  observer(() => {
    const classes = useStyles();

    const [drawerState, setDrawerState] = useState(false);

    const handleDrawerOpen = () => {
      setDrawerState(true);
    };

    const handleDrawerClose = () => {
      setDrawerState(false);
    };

    return (
      <div className={classes.root}>
        <TopNavBar
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerState={drawerState}
        />
        <NavDrawer
          handleDrawerClose={handleDrawerClose}
          handleDrawerState={drawerState}
        />
        <div className={classes.content}>
          <Typography variant="h3">Database UI</Typography>
          <RecordListContainer
            records={participantStore.getParticipants()}
          ></RecordListContainer>
        </div>
      </div>
    );
  }),
);
