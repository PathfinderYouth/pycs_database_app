import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Refresh from '@material-ui/icons/Refresh';
import { StatisticsCard } from './StatisticsCard';
import { statisticsGroups, updateStatistics } from './statisticsHelpers';
import service from '../../../facade/service';
import '../style/StatisticsView.css';
import { exportParticipants } from './exportHelpers';

const percent = (amount, total) => {
  return total === 0 ? '' : Math.round((amount / total) * 100) + '%';
};

const getCountByID = (object, value) => {
  return object[Object.keys(object).find((key) => object[key].id === value)];
};

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
  statsContent: {
    marginBottom: theme.spacing(10),
  },
}));

export const StatisticsView = inject('participantStore')(
  observer(() => {
    const classes = useStyles();
    const db = service.getDatabase();
    const [dropdownSelection, setDropdownSelection] = useState('');
    const [currentGroup, setCurrentGroup] = useState(null);
    const [totalCounts, setTotalCounts] = useState(null);
    const [statsGroupCounts, setStatsGroupCounts] = useState(null);
    const [lastUpdated, setLastUpdated] = useState('Last updated time unavailable');
    const [loaded, setLoaded] = useState(false);
    const dropdownOptions = statisticsGroups.map((group) => {
      return { id: group.id, label: group.label };
    });

    /**
     * Gets current statistics counts from the database
     */
    const readStats = () => {
      db.getAllStatistics((statistics) => {
        setTotalCounts(statistics.totalCounts);
        setStatsGroupCounts(statistics.statisticsGroups);
      });
    };

    useEffect(() => {
      //read stats from DB when page loads
      readStats();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (
        statsGroupCounts !== null &&
        totalCounts !== null &&
        !!statsGroupCounts &&
        !!totalCounts
      ) {
        //Clears loading circle and updates the "last updated" info on the refresh button
        setLoaded(true);
        setLastUpdated(
          'Last updated: ' + moment(statsGroupCounts.createdAt).format('ddd, MMM D YYYY, h:mm a'),
        );
      }
    }, [statsGroupCounts, totalCounts]);

    const onDropdownChange = (event) => {
      setDropdownSelection(event.target.value);
      setCurrentGroup(getCountByID(statsGroupCounts, event.target.value));
    };

    return loaded ? (
      <div className="maxWidth maxHeight">
        <Grid
          className={`${classes.statsContent} maxWidth`}
          container
          spacing={1}
          alignItems="stretch"
        >
          <Grid item xs={4}>
            <Typography className="sectionHead">All Time</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography className="sectionHead">New Participants</Typography>
          </Grid>
          {Object.keys(totalCounts).map((index) => {
            const count = totalCounts[index];
            return (
              <Grid item xs={4} key={count.id}>
                <StatisticsCard
                  key={count.id}
                  statsList={[{ label: count.label, number: count.count }]}
                />
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <FormControl className="statisticsDropdown">
              <InputLabel>Select demographic</InputLabel>
              <Select value={dropdownSelection} onChange={onDropdownChange}>
                {dropdownOptions.map((group) => (
                  <MenuItem value={group.id} key={group.id}>
                    {group.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {currentGroup !== null &&
            currentGroup.subcategories.map((category) => {
              return (
                <Fragment key={category.id}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{category.label}</Typography>
                  </Grid>
                  {[
                    { id: 'total', label: 'Total Participants' },
                    { id: 'mtd', label: 'Month to Date' },
                    { id: 'ytd', label: 'Year to Date' },
                  ].map((time) => {
                    return (
                      <Grid item xs={4} key={category.id + '_' + time.id}>
                        <StatisticsCard
                          key={category.id + '_' + time.id}
                          statsList={[
                            { label: time.label, number: category.counts[time.id] },
                            {
                              label: 'Percentage',
                              number: percent(
                                category.counts[time.id],
                                getCountByID(totalCounts, time.id).count,
                              ),
                            },
                          ]}
                        />
                      </Grid>
                    );
                  })}
                </Fragment>
              );
            })}
        </Grid>
        <Tooltip title={lastUpdated} aria-label="refresh" placement="left">
          <Fab
            color="primary"
            className={classes.fab}
            onClick={() => {
              if (
                window.confirm(
                  'Update statistics? This may take a few moments.\n' +
                    'Doing this too frequently (i.e. more than once a day) ' +
                    'may result in increased database costs.',
                )
              ) {
                setLoaded(false);
                updateStatistics((participantsList) => {
                  if (window.confirm('Do you want to save a local copy of the database?')) {
                    exportParticipants(participantsList);
                  }
                  readStats();
                });
              }
            }}
          >
            <Refresh />
          </Fab>
        </Tooltip>
      </div>
    ) : (
      <div className="statisticsLoading">
        <CircularProgress color="primary" />
      </div>
    );
  }),
);
