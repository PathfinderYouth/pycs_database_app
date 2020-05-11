import React, { useEffect, useState } from 'react';
import {
  DetailViewDrawer,
  ListContainer,
  ListViewDrawer,
  NavDrawer,
  ParticipantTabs,
  TopNavBar,
  viewModes,
} from './components';
import { makeStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
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
    const participantHeaders = [
      { id: 'status', label: 'Status' },
      { id: 'lastName', label: 'Last Name' },
      { id: 'firstName', label: 'First Name' },
      { id: 'birthDate', label: 'Date of Birth' },
      { id: 'address', label: 'Address' },
      { id: 'city', label: 'City' },
    ];
    const staffHeaders = [
      { id: 'email', label: 'Email' },
      { id: 'name', label: 'Name' },
      { id: 'role', label: 'Role' },
    ];

    const [drawerState, setDrawerState] = useState(false);
    const [viewMode, setViewMode] = useState(viewModes.PARTICIPANT_LIST);

    // Get record clicked from RecordListContainer.js and passed to RecordDialog.js
    const [openParticipantRecord, setOpenParticipantRecord] = useState(null);
    const [openStaffRecord, setOpenStaffRecord] = useState(null);
    const { participants, setCollection, numOfNewParticipants } = participantStore;

    const handleDrawerOpen = () => {
      setDrawerState(true);
    };

    const handleDrawerClose = () => {
      setDrawerState(false);
    };

    const handleParticipantOpen = () => {
      setViewMode(viewModes.PARTICIPANT_DETAIL);
    };

    const handleParticipantClose = () => {
      setViewMode(viewModes.PARTICIPANT_LIST);
    };

    const handleStaffOpen = () => {
      setViewMode(viewModes.STAFF_DETAIL);
    };

    const handleStaffClose = () => {
      setViewMode(viewModes.STAFF_LIST);
    };

    const handleViewDrawerClick = (itemClicked) => {
      //TODO change modes/make queries depending on what was clicked
    };

    const listViewDrawer = (
      <ListViewDrawer
        handleClick={handleViewDrawerClick}
        numNew={numOfNewParticipants}
        classes={classes}
      />
    );

    const participantListView = (
      <ListContainer
        headers={participantHeaders}
        records={participants}
        setRowClicked={setOpenParticipantRecord}
        handleRowOpened={handleParticipantOpen}
        handleRowClosed={handleParticipantClose}
      />
    );

    const [navButtons, setNavButtons] = useState(listViewDrawer);
    const [contentView, setContentView] = useState(participantListView);

    const handleChangeParticipantTab = () => {
      //TODO
    };

    const switchNavDrawer = () => {
      switch (viewMode) {
        case viewModes.PARTICIPANT_LIST:
        case viewModes.STAFF_LIST:
          return listViewDrawer;
        case viewModes.PARTICIPANT_DETAIL:
          return (
            <DetailViewDrawer
              handleClickBack={handleParticipantClose}
              subComponent={<ParticipantTabs handleClick={handleChangeParticipantTab()} />}
            />
          );
        case viewModes.STAFF_DETAIL:
          return <DetailViewDrawer handleClickBack={handleStaffClose()} />;
        default:
          return null;
      }
    };

    const switchContentView = () => {
      switch (viewMode) {
        case viewModes.PARTICIPANT_LIST:
          return participantListView;
        case viewModes.PARTICIPANT_DETAIL:
          return null; //TODO replace with participant details
        case viewModes.STAFF_LIST:
          return (
            <ListContainer
              headers={staffHeaders}
              records={null} //TODO
              setRowClicked={setOpenStaffRecord}
              handleRowOpened={handleStaffOpen}
              handleRowClosed={handleStaffClose}
            />
          );
        case viewModes.STAFF_DETAIL:
          return null; //TODO replace with staff details
        default:
          return null;
      }
    };

    useEffect(() => {
      // Do this after the component is initialized
      setCollection('new');
      switchContentView();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={`${classes.root} root`}>
        <TopNavBar handleDrawerOpen={handleDrawerOpen} handleDrawerState={drawerState} />
        <NavDrawer
          handleDrawerClose={handleDrawerClose}
          handleDrawerState={drawerState}
          subComponent={switchNavDrawer()}
        />
        <div className={`${classes.content} content`}>{switchContentView()}</div>
      </div>
    );
  }),
);
