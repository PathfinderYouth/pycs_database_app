import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import {
  NavDrawer,
  TopNavBar,
  RecordListContainer,
  RecordDialog,
} from './components';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';
import { participantStore } from '../injectables';
import './Database.css';

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
    const [openDialog, setOpenDialog] = useState(false);
    // Get record clicked from RecordListContainer.js and passed to RecordDialog.js
    const [recordListClicked, setRecordListClicked] = useState({
      id: null,
      lastName: null,
      firstName: null,
      address: null,
      city: null,
      status: null,
      birthDate: null,
    });
    const { participants } = participantStore;

    const handleDrawerOpen = () => {
      setDrawerState(true);
    };

    const handleDrawerClose = () => {
      setDrawerState(false);
    };

    const handleDialogOpen = () => {
      setOpenDialog(true);
    };

    const handleDialogClose = () => {
      setOpenDialog(false);
    };

    return (
      <div className={`${classes.root} root`}>
        <TopNavBar
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerState={drawerState}
        />
        <NavDrawer
          handleDrawerClose={handleDrawerClose}
          handleDrawerState={drawerState}
        />
        {openDialog ? (
          <RecordDialog
            openDialog={openDialog}
            handleDialogClose={handleDialogClose}
            recordListClicked={recordListClicked}
          />
        ) : null}
        <div className={`${classes.content} content`}>
          <Typography variant="h3">Database UI</Typography>
          <RecordListContainer
            records={participants}
            handleDialogOpen={handleDialogOpen}
            handleDialogClose={handleDialogClose}
            setRecordListClicked={setRecordListClicked}
          ></RecordListContainer>
        </div>
      </div>
    );
  }),
);
