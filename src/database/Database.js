import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '@reach/router';
import { makeStyles } from '@material-ui/core/styles';
import {
  NavDrawer,
  TopNavBar,
  RecordListContainer,
  RecordDialog,
} from './components';
import './Database.css';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
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
export const Database = () => {
  const classes = useStyles();

  const [drawerState, setDrawerState] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  // Get record id clicked from RecordListContainer.js and passed to RecordDialog.js
  const [recordListClicked, setRecordListClicked] = useState(null);

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
        handleDialogOpen={handleDialogOpen}
        handleDialogClose={handleDialogClose}
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
          records={records}
        />
      ) : null}

      <div className={`${classes.content} content`}>
        <Typography variant="h3">Database UI</Typography>
        {/* Components go here */}
        <div>
          <Link to="/">
            <Typography>Back to the intake form</Typography>
          </Link>
          <RecordListContainer
            records={records}
            handleDialogOpen={handleDialogOpen}
            handleDialogClose={handleDialogClose}
            setRecordListClicked={setRecordListClicked}
          ></RecordListContainer>
        </div>
      </div>
    </div>
  );
};
