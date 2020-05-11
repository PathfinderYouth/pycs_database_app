import React, { useEffect, useState, useContext } from 'react';
import { NavDrawer, RecordListContainer, TopNavBar } from './components';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from '@reach/router';
import { inject, observer } from 'mobx-react';
import { participantStore } from '../injectables';
import { AuthContext } from '../sign-in/components/AuthContext';
import './Database.css';
import { AlternateEmail } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
}));

// container that holds all database UI objects
export const Database = inject('participantStore')(
  observer(() => {
    const classes = useStyles();
    const [drawerState, setDrawerState] = useState(false);
    // Get record clicked from RecordListContainer.js and passed to RecordDialog.js
    const [recordListClicked, setRecordListClicked] = useState(null);
    const [openRecord, setOpenRecord] = useState(false);
    const { participants, setCollection, numOfNewParticipants } = participantStore;

    const handleDrawerOpen = () => {
      setDrawerState(true);
    };

    const handleDrawerClose = () => {
      setDrawerState(false);
    };

    const handleRecordOpen = () => {
      setOpenRecord(true);
    };

    const handleRecordClose = () => {
      setOpenRecord(false);
    };

    useEffect(() => {
      // Do this after the component is initialized
      setCollection('new');

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useContext hook accepts value from AuthContext provider
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
      return <Redirect to="/sign-in" />;
    }

    return (
      <div className={`${classes.root} root`}>
        <TopNavBar handleDrawerOpen={handleDrawerOpen} handleDrawerState={drawerState} />
        <NavDrawer
          handleDrawerClose={handleDrawerClose}
          handleDrawerState={drawerState}
          isRecordOpen={openRecord}
        />
        <div className={`${classes.content} content`}>
          {openRecord ? (
            <div>
              <Typography variant="h1" onClick={handleRecordClose}>
                Back!
              </Typography>
            </div>
          ) : (
            <>
              <RecordListContainer
                records={participants}
                handleRecordOpen={handleRecordOpen}
                handleRecordClose={handleRecordClose}
                setRecordListClicked={setRecordListClicked}
              />
            </>
          )}
        </div>
      </div>
    );
  }),
);
