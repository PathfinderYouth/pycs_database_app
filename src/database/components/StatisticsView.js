import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { StatisticsCard } from './StatisticsCard';
import './style/StatisticsView.css';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import { updateStatistics, statisticsGroups } from './statisticsHelpers';
import Button from '@material-ui/core/Button';
import { participantStore } from '../../injectables';

const percent = (amount, total) => {
  return Math.round(amount / total);
};

export const StatisticsView = inject('participantStore')(
  observer(() => {
    const [currentGroup, setCurrentGroup] = useState('');
    const { totalCounts, statisticsGroupCounts } = participantStore;

    console.log(totalCounts);
    console.log(statisticsGroupCounts);

    const topRow = [
      {
        cardName: 'totalParticipants',
        contents: [{ label: 'Total Participants', number: totalCounts.counts.total }],
      },
      {
        cardName: 'mtdParticipants',
        contents: [{ label: 'Month to Date', number: totalCounts.counts.mtd }],
      },
      {
        cardName: 'ytdParticipants',
        contents: [{ label: 'Year to Date', number: totalCounts.counts.ytd }],
      },
    ];

    const onDropdownChange = (event) => {
      setCurrentGroup(event.target.value);
    };

    return (
      <Grid className="maxWidth" container spacing={1} alignItems="stretch">
        <Grid item xs={4}>
          <Typography variant="body1" className="sectionHead">
            All Time
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" className="sectionHead">
            New Participants
          </Typography>
        </Grid>
        {topRow.map((card) => (
          <Grid item xs={4} key={card.cardName}>
            <StatisticsCard statsList={card.contents} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <FormControl className="statisticsDropdown">
            <InputLabel>Select demographic</InputLabel>
            <Select defaultValue={currentGroup} onChange={onDropdownChange}>
              {statisticsGroups.map((group) => (
                <MenuItem value={group.id} key={group.id}>
                  {group.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Button onClick={updateStatistics}>Push me!</Button>
      </Grid>
    );
  }),
);
