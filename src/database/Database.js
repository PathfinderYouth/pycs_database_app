import React, { useContext, useEffect } from 'react';
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
import { participantStore, userStore, uiStore } from '../injectables';
import './Database.css';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
}));

export const Database = inject(
  'participantStore',
  'userStore',
  'uiStore',
)(
  observer(() => {
    const classes = useStyles();

    const {
      viewModes,
      currentViewMode,
      navigationDrawerOpen,
      setNavigationDrawerOpen,
      currentListViewOrder,
      currentListViewOrderBy,
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
      setSelectedUser,
      goToPreviousPage: goToUserPreviousPage,
      goToNextPage: goToUserNextPage,
      isLastPage: isUserLastPage,
      setFilter: setUserFilter,
      setSorter: setUserSorter,
      setLimit: setUserLimit,
    } = userStore;

    const handleParticipantViewChanged = (collection, status) => {
      setCollection(collection);
      setParticipantFilter({ status: status });

      let sorter = {};
      sorter[currentListViewOrderBy] = currentListViewOrder;
      setParticipantSorter(sorter);
    };

    const handleOrderChanged = (orderBy, order) => {
      let sorter = {};
      sorter[orderBy] = order;

      if (currentViewMode === viewModes.STAFF_LIST) {
        setUserSorter(sorter);
      } else {
        setParticipantSorter(sorter);
      }
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
              onParticipantViewChanged={handleParticipantViewChanged}
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
            }
          : {
              records: participants,
              onRowClicked: setCurrentParticipant,
              onPrevButtonClicked: goToParticipantPreviousPage,
              onNextButtonClicked: goToParticipantNextPage,
              nextButtonDisabled: isParticipantLastPage,
              onChangeRowsPerPage: setParticipantLimit,
              onOrderChanged: handleOrderChanged,
            };

      return <ListContainer {...listViewProps} />;
    };

    /**
     * Gets content of main page view
     */
    const getContent = () => {
      switch (currentViewMode) {
        case viewModes.STAFF_DETAIL:
          // We don't really need staff details page, because each user object only has 3 fields which are displayed on staff table.
          return <div>Staff Details</div>; //TODO replace with staff detail page

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
