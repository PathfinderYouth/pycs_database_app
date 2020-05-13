import React, { useEffect, useContext } from 'react';
import {
  DetailViewDrawer,
  ListContainer,
  ListViewDrawer,
  NavDrawer,
  StatisticsView,
  TopNavBar,
} from './components';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import { inject, observer } from 'mobx-react';
import { AuthContext } from '../sign-in/components';
import { participantStore, uiStore } from '../injectables';
import './Database.css';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
}));

// container that holds all database UI objects
export const Database = inject(
  'participantStore',
  'uiStore',
)(
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
      goToPreviousPage,
      goToNextPage,
      isLastPage,
      setFilter,
      setSorter,
      setLimit,
      setCollection,
    } = participantStore;

    const handleParticipantViewChanged = (collection, status) => {
      setCollection(collection);
      setFilter({
        status: status,
        // TODO: add up to one startWith comparison (value from search bar)
      });
      // TODO: setSorter
    };

    /**
     * Gets content of side drawer
     */
    const getNavDrawerContents = () => {
      switch (currentViewMode) {
        // detail modes
        case viewModes.PARTICIPANT_DETAIL:
        case viewModes.STAFF_DETAIL:
          return <DetailViewDrawer />;
        // list modes
        case viewModes.PARTICIPANT_LIST:
        case viewModes.STAFF_LIST:
        default:
          return (
            <ListViewDrawer
              numNew={numOfNewParticipants}
              classes={classes}
              onParticipantViewChanged={handleParticipantViewChanged}/>
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
              // TODO: set other properties like the one for participant
              onRowClicked: (clickedRow) => console.log('Opening staff record'),
            }
          : {
              records: participants,
              onRowClicked: setCurrentParticipant,
              onPrevButtonClicked: goToPreviousPage,
              onNextButtonClicked: goToNextPage,
              nextButtonDisabled: isLastPage,
              onChangeRowsPerPage: setLimit,
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
          return <StatisticsView />;

        case viewModes.STAFF_LIST:
        case viewModes.PARTICIPANT_LIST:
        default:
          return getListView();
      }
    };

    // useContext hook accepts value from AuthContext provider
    const { currentUser } = useContext(AuthContext);
    useEffect(() => {
      if (!currentUser) {
        navigate('/sign-in');
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
