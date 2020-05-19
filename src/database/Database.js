import React, { useContext, useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DetailViewDrawer,
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

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
    width: 'calc(100% - 240px)', // full width - size of nav drawer
  },
}));

export const Database = inject(
  'participantStore',
  'userStore',
  'uiStore',
)(
  observer(() => {
    const classes = useStyles();
    const [currentStatus, setCurrentStatus] = useState(null);
    const {
      currentViewMode,
      navigationDrawerOpen,
      setNavigationDrawerOpen,
      setRecordSearchBoxActive,
      setCurrentSearchText,
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

    const handleParticipantViewChanged = (collection, status) => {
      setCurrentStatus(status);
      setCollection(collection);
      setParticipantFilter({ status: status });
      setCurrentSearchText('');
      setRecordSearchBoxActive(false);
    };

    const handleStaffViewChanged = () => {
      setUserFilter({});
      setCurrentSearchText('');
      setRecordSearchBoxActive(false);
    };

    const handleOrderChanged = (orderBy, order) => {
      let sorter = {};
      let sortFunction =
        currentViewMode === viewModes.STAFF_LIST ? setUserSorter : setParticipantSorter;
      sorter[orderBy] = order;
      sortFunction(sorter);
    };

    const handleSearchClicked = (searchBy, searchText) => {
      let filter = currentViewMode === viewModes.STAFF_LIST ? {} : { status: currentStatus };
      let filterFunction =
        currentViewMode === viewModes.STAFF_LIST ? setUserFilter : setParticipantFilter;
      filter[searchBy] = searchText;
      setRecordSearchBoxActive(searchText !== '');
      filterFunction(filter);
    };

    const handleDrawerClose = () => setNavigationDrawerOpen(false);

    /**
     * Gets content of side drawer
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
     * Gets content of list view
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
     * Gets content of main page view
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
      if (!currentUser) {
        navigate('/sign-in');
      } else {
        updateCurrentUser(currentUser.email);
      }
    });

    return (
      <div className={`${classes.root} database-root`}>
        <TopNavBar
          handleDrawerOpen={() => setNavigationDrawerOpen(true)}
          drawerState={navigationDrawerOpen}
        />
        <NavDrawer handleDrawerClose={handleDrawerClose} drawerState={navigationDrawerOpen}>
          {getNavDrawerContents()}
        </NavDrawer>

        <div className={`${classes.content} database-content`}>{getContent()}</div>
      </div>
    );
  }),
);
