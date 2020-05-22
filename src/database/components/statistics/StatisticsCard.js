import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import '../style/StatisticsCard.css';

/**
 * The card each statistics item appears on
 */
export const StatisticsCard = (props) => {
  const { statsList } = props;
  return (
    <Paper className="card">
      <Grid container spacing={1} alignItems="stretch">
        {statsList.map((stat, index) => {
          return (
            <Grid
              item
              container
              xs={6}
              key={index}
              className="statItem"
              justify="flex-start"
              alignItems="flex-end"
            >
              <Grid item xs={12} key={stat.label + index}>
                <Typography variant="body2">{stat.label}</Typography>
              </Grid>
              <Grid item xs={12} key={stat.label + '_number' + index}>
                <Typography variant="h2">{stat.number}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
