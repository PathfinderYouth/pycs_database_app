import React, { useContext, useEffect, useState } from 'react';
import IdleTimer from 'react-idle-timer';
import { navigate } from '@reach/router';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DetailViewDrawer,
  IdleDialog,
  ListContainer,
  ListViewDrawer,
  NavDrawer,
  ParticipantDetailPage,
  StatisticsView,
  TopNavBar,
} from './components';
import { AuthContext } from '../sign-in';
import { viewModes } from '../constants';
import { participantStore, uiStore, userStore } from '../injectables';
import './Database.css';
import service from '../facade/service';

const authService = service.getAuthentication();

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    width: 'calc(100% - 240px)', // full width - size of nav drawer
  },
}));

/**
 * Entry point and routing component of the participant database
 */
export const Database = inject(
  'participantStore',
  'userStore',
  'uiStore',
)(
  observer(() => {
    const classes = useStyles();
    const [currentStatus, setCurrentStatus] = useState(null);
    const [idleTimer, setIdleTimer] = useState(null);
    const [idleDialogOpen, setIdleDialogOpen] = useState(false);
    const {
      currentViewMode,
      navigationDrawerOpen,
      setNavigationDrawerOpen,
      setRecordSearchBoxActive,
      setCurrentSearchText,
      setDatabaseActive,
    } = uiStore;
    const {
      participants,
      numOfNewParticipants,
      setCurrentParticipant,
      goToPreviousPage: goToParticipantPreviousPage,
      goToNextPage: goToParticipantNextPage,
      isLastPage: isParticipantLastPage,
      setFilter: setParticipantFilter,
      setSorter: setParticipantSorter,
      setLimit: setParticipantLimit,
      setCollection,
    } = participantStore;
    const {
      users,
      updateCurrentUser,
      setSelectedUser,
      goToPreviousPage: goToUserPreviousPage,
      goToNextPage: goToUserNextPage,
      isLastPage: isUserLastPage,
      setFilter: setUserFilter,
      setSorter: setUserSorter,
      setLimit: setUserLimit,
    } = userStore;

    /**
     * Signs the user out and clears the data from the participant store
     */
    const logout = () => {
      authService.signOut(() => {
        participantStore.clearStore();
        uiStore.setDatabaseActive(false);
      });
    };

    /**
     * When the user is active after being idle, clear dialog and reset timer
     */
    const onActive = () => {
      setIdleDialogOpen(false);
      idleTimer.reset();
    };

    /**
     * When user is idle for 10 minutes, open idle dialog. After 10 more minutes, log out
     * @param e
     */
    const onIdle = () => {
      if (idleDialogOpen) {
        logout();
      } else {
        setIdleDialogOpen(true);
        idleTimer.reset();
      }
    };

    /**
     * Changes the participant list view depending on the collection, status, and search text
     * @param {string} collection collection name - new | permanent
     * @param {string} status status to filter the participant list by - initially set to null
     */
    const handleParticipantViewChanged = (collection, status) => {
      // Reset participant-collection query to default state
      setCurrentStatus(status);
      setCollection(collection);
      setParticipantFilter({ status: status });

      // Reset searchbar
      setCurrentSearchText('');
      setRecordSearchBoxActive(false);
    };

    /**
     * Resets the staff list view
     */
    const handleStaffViewChanged = () => {
      // Reset user-collection query to default state
      setUserFilter({});

      // Reset searchbar
      setCurrentSearchText('');
      setRecordSearchBoxActive(false);
    };

    /**
     * Handler for sorting changes
     * @param {string} orderBy field to sort list by - last name, given name, sin, etc
     * @param {string} order current sorting order
     */
    const handleOrderChanged = (orderBy, order) => {
      // Update query to sort the results
      let sorter = {};
      let sortFunction =
        currentViewMode === viewModes.STAFF_LIST ? setUserSorter : setParticipantSorter;
      sorter[orderBy] = order;
      sortFunction(sorter);
    };

    /**
     * Handler for searching actions
     * @param {string} searchBy field to search by - last name, given name, sin, etc
     * @param {string} searchText text to search with
     */
    const handleSearchClicked = (searchBy, searchText) => {
      // Update query to filter the results by the value of a field
      let filter = currentViewMode === viewModes.STAFF_LIST ? {} : { status: currentStatus };
      let filterFunction =
        currentViewMode === viewModes.STAFF_LIST ? setUserFilter : setParticipantFilter;
      filter[searchBy] = searchText;
      setRecordSearchBoxActive(searchText !== '');
      filterFunction(filter);
    };

    /**
     * Handler to close the navigation drawer
     */
    const handleDrawerClose = () => setNavigationDrawerOpen(false);

    /**
     * Gets content of side drawer (detail or list view)
     */
    const getNavDrawerContents = () => {
      switch (currentViewMode) {
        // detail modes
        case viewModes.PARTICIPANT_DETAIL:
          return <DetailViewDrawer handleDrawerClose={handleDrawerClose} />;
        // list modes
        case viewModes.PARTICIPANT_LIST:
        case viewModes.STAFF_LIST:
        default:
          return (
            <ListViewDrawer
              numNew={numOfNewParticipants}
              classes={classes}
              handleDrawerClose={handleDrawerClose}
              onParticipantViewChanged={handleParticipantViewChanged}
              onStaffViewChanged={handleStaffViewChanged}
            />
          );
      }
    };

    /**
     * Sets the props of the list container and returns the initialized ListContainer component
     * depending on the currently-set view mode in the UIStore
     */
    const getListView = () => {
      const listViewProps =
        currentViewMode === viewModes.STAFF_LIST
          ? {
              records: users,
              onRowClicked: setSelectedUser,
              onPrevButtonClicked: goToUserPreviousPage,
              onNextButtonClicked: goToUserNextPage,
              nextButtonDisabled: isUserLastPage,
              onChangeRowsPerPage: setUserLimit,
              onOrderChanged: handleOrderChanged,
              onSearchClicked: handleSearchClicked,
            }
          : {
              records: participants,
              onRowClicked: setCurrentParticipant,
              onPrevButtonClicked: goToParticipantPreviousPage,
              onNextButtonClicked: goToParticipantNextPage,
              nextButtonDisabled: isParticipantLastPage,
              onChangeRowsPerPage: setParticipantLimit,
              onOrderChanged: handleOrderChanged,
              onSearchClicked: handleSearchClicked,
            };

      return <ListContainer {...listViewProps} />;
    };

    /**
     * Gets content of main page view (participant detail, list (staff or participants), or statistics)
     * depending on the currently-set view mode in the UIStore
     */
    const getContent = () => {
      switch (currentViewMode) {
        case viewModes.PARTICIPANT_DETAIL:
          return <ParticipantDetailPage />;

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
      // if currentUser is null or undefined, navigate back to sign-in
      if (!currentUser) {
        navigate('/sign-in');
      } else {
        setDatabaseActive(true);
        updateCurrentUser(currentUser.email);
      }
    });

    return (
      <div className={`${classes.root} database-root`}>
        <IdleTimer
          ref={(ref) => {
            setIdleTimer(ref);
          }}
          element={document}
          onActive={() => onActive()}
          onIdle={() => onIdle()}
          debounce={250}
          timeout={600000} //10 minutes
        />
        <TopNavBar
          handleDrawerOpen={() => setNavigationDrawerOpen(true)}
          drawerState={navigationDrawerOpen}
          onLogoutClicked={logout}
        />
        <NavDrawer handleDrawerClose={handleDrawerClose} drawerState={navigationDrawerOpen}>
          {getNavDrawerContents()}
        </NavDrawer>

        <div className={`${classes.content} database-content`}>{getContent()}</div>
        <IdleDialog isOpen={idleDialogOpen} setIdleDialogOpen={setIdleDialogOpen} />
      </div>
    );
  }),
);
