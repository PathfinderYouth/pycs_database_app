import React, { useEffect, useContext } from 'react';
import {
  DetailViewDrawer,
  ListContainer,
  ListViewDrawer,
  NavDrawer,
  TopNavBar,
} from './components';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import { inject, observer } from 'mobx-react';
import { AuthContext } from '../sign-in/components/AuthContext';
import { participantStore, uiStore } from '../injectables';
import './Database.css';
import { AlternateEmail } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(3),
  },
}));

// container that holds all database UI objects
export const Database = inject('participantStore', 'uiStore')(
  observer(() => {
    const classes = useStyles();

    const {
      viewModes,
      currentViewMode,
      navigationDrawerOpen,
      setNavigationDrawerOpen,
    } = uiStore;
    const {
      participants,
      numOfNewParticipants,
      setCurrentParticipant,
    } = participantStore;

    /**
     * Gets content of side drawer
     */
    const getNavDrawerContents = () => {
      switch (currentViewMode) {
        // detail modes
        case viewModes.PARTICIPANT_DETAIL:
        case viewModes.STAFF_DETAIL:
          return (
            <DetailViewDrawer/>
          );
        // list modes
        case viewModes.PARTICIPANT_LIST:
        case viewModes.STAFF_LIST:
        default:
          return (
            <ListViewDrawer
              numNew={numOfNewParticipants}
              classes={classes}
            />
          );
      }
    };

    /**
     * Gets content of list view
     */
    const getListView = () => {
      const listViewProps =
        currentViewMode === viewModes.STAFF_LIST
          ? {
              records: [], // TODO: get user list from user store
              // TODO: set current user in user store
              setRowClicked: () => console.log('Opening staff record'), 
            }
          : {
              records: participants,
              setRowClicked: setCurrentParticipant,
            };

      return <ListContainer {...listViewProps} />;
    };

    /**
     * Gets content of main page view
     */
    const getContent = () => {
      switch (currentViewMode) {
        case viewModes.STAFF_DETAIL:
          return <div>Staff Detail</div>; //TODO replace with staff detail page
        
        case viewModes.PARTICIPANT_DETAIL:
          return <div>Participant Detail</div>; //TODO replace with participant detail page
      
        case viewModes.STATISTICS:
          return <div>Statistics</div>; //TODO replace with statistics page
        
        case viewModes.STAFF_LIST:
        case viewModes.PARTICIPANT_LIST:
        default:
          return getListView();
      }
    };

    // useContext hook accepts value from AuthContext provider
    const { currentUser } = useContext(AuthContext);
    useEffect(()=>{
      if (!currentUser) {
        navigate("/sign-in");
      }
    });

    return (
      <div className={`${classes.root} root`}>
        <TopNavBar
          handleDrawerOpen={() => setNavigationDrawerOpen(true)}
          drawerState={navigationDrawerOpen}
        />
        <NavDrawer
          handleDrawerClose={() => setNavigationDrawerOpen(false)}
          drawerState={navigationDrawerOpen}
        >
          {getNavDrawerContents()}
        </NavDrawer>
        <div className={`${classes.content} content`}>{getContent()}</div>
      </div>
    );
  }),
);
