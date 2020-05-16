import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { StatisticsCard } from './StatisticsCard';
import './style/StatisticsView.css';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { statisticsGroups, updateStatistics } from './statisticsHelpers';
import { participantStore } from '../../injectables';
import { Refresh } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import Fab from '@material-ui/core/Fab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import service from '../../facade/service';

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

    const readStats = () => {
      db.getAllStatistics((statistics) => {
        setTotalCounts(statistics.totalCounts);
        setStatsGroupCounts(statistics.statisticsGroups);
      });
    };

    useEffect(() => {
      readStats();
    }, []);

    useEffect(() => {
      if (
        statsGroupCounts !== null &&
        totalCounts !== null &&
        !!statsGroupCounts &&
        !!totalCounts
      ) {
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
        <Grid className="maxWidth" container spacing={1} alignItems="stretch">
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
              <Select defaultValue={''} onChange={onDropdownChange}>
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
                <>
                  <Grid item xs={12} key={category.id}>
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
                </>
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
                updateStatistics(() => {
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
        <CircularProgress />
      </div>
    );
  }),
);
