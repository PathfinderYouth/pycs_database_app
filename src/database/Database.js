import React, { useEffect, useContext } from 'react';
import { navigate } from '@reach/router';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import {
  DetailViewDrawer,
  ParticipantDetailPage,
  ListContainer,
  ListViewDrawer,
  NavDrawer,
  StatisticsView,
  TopNavBar,
} from './components';
import { AuthContext } from '../sign-in/components';
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

    const { viewModes, currentViewMode, navigationDrawerOpen, setNavigationDrawerOpen } = uiStore;
    const {
      participants,
      numOfNewParticipants,
      setCurrentParticipant,
      setCollection,
    } = participantStore;
    const { users, setSelectedUser } = userStore;

    const handleParticipantViewChanged = (collection, status) => {
      setCollection(collection);
      participantStore.setFilter({ status: status });
      participantStore.setSorter({ nameLast: 'asc' });
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
              onPrevButtonClicked: userStore.goToPreviousPage,
              onNextButtonClicked: userStore.goToNextPage,
              nextButtonDisabled: userStore.isLastPage,
              onChangeRowsPerPage: userStore.setLimit,
            }
          : {
              records: participants,
              onRowClicked: setCurrentParticipant,
              onPrevButtonClicked: participantStore.goToPreviousPage,
              onNextButtonClicked: participantStore.goToNextPage,
              nextButtonDisabled: participantStore.isLastPage,
              onChangeRowsPerPage: participantStore.setLimit,
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
