import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import { NavDrawer, TopNavBar, RecordListContainer } from './components';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { participantStore } from '../injectables';

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
export const Database = inject('participantStore')(
  observer(() => {
    const classes = useStyles();
    const [drawerState, setDrawerState] = useState(false);
    const { participants } = participantStore;

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
            records={participants}
          ></RecordListContainer>
        </div>
      </div>
    );
  }),
);
