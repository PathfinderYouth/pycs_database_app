import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './style/StatisticsCard.css';
import Grid from '@material-ui/core/Grid';

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
              justify="start"
              alignItems="flex-end"
            >
              <Grid item xs={12}>
                <Typography variant="body2">{stat.label}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h2">{stat.number}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
