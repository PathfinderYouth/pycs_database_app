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
import { updateStatistics } from './statisticsHelpers';
import Button from '@material-ui/core/Button';
import { participantStore } from '../../injectables';

const percent = (amount, total) => {
  return Math.round(amount / total);
};

export const StatisticsView = inject('participantStore')(
  observer(() => {
    const [currentGroup, setCurrentGroup] = useState('');
    const { totalCounts, statisticsGroups } = participantStore;

    console.log(totalCounts);
    console.log(statisticsGroups);

    const topRow = [
      {
        cardName: 'totalParticipants',
        contents: [{ label: 'Total Participants', number: 0 }],
      },
      {
        cardName: 'mtdParticipants',
        contents: [{ label: 'Month to Date', number: 0 }],
      },
      {
        cardName: 'ytdParticipants',
        contents: [{ label: 'Year to Date', number: 0 }],
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
          {/*<FormControl className="statisticsDropdown">*/}
          {/*  <InputLabel>Select demographic</InputLabel>*/}
          {/*  <Select defaultValue={currentGroup} onChange={onDropdownChange}>*/}
          {/*    {statisticsGroups.map((group) => (*/}
          {/*      <MenuItem value={group.id} key={group.id}>*/}
          {/*        {group.label}*/}
          {/*      </MenuItem>*/}
          {/*    ))}*/}
          {/*  </Select>*/}
          {/*</FormControl>*/}
        </Grid>
        <Button onClick={updateStatistics}>Push me!</Button>
      </Grid>
    );
  }),
);
